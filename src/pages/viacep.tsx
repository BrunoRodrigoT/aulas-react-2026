import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Alert from "../components/alert";
import Button from "../components/button";
import Divider from "../components/divider";
import { mensagemDeErro } from "../utils/erro";

type Endereco = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

export default function ViaCep() {
  const [cep, setCep] = useState("01310-100");
  const [tentativa, setTentativa] = useState(0);
  const [dados, setDados] = useState<Endereco | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const digitos = cep.replace(/\D/g, "");
    if (digitos.length !== 8) return;

    const controller = new AbortController();
    const debounce = setTimeout(async () => {
      setCarregando(true);
      setErro(null);
      try {
        const response = await axios.get<Endereco>(
          `https://viacep.com.br/ws/${digitos}/json/`,
          { signal: controller.signal, timeout: 5000 }
        );
        if (response.data.erro) {
          setDados(null);
          setErro("CEP não encontrado.");
        } else {
          setDados(response.data);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          setErro(axios.isAxiosError(error) && error.code === "ECONNABORTED"
            ? "Tempo de resposta esgotado (timeout de 5s)."
            : mensagemDeErro(error));
        }
      } finally {
        setCarregando(false);
      }
    }, 500);

    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [cep, tentativa]);

  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "500px" }}>
      <Header>ViaCEP</Header>
      <p style={{ color: "#6b7280", fontSize: "14px" }}>
        Digite um CEP — busca automática com debounce de 500ms e cancelamento da requisição anterior.
      </p>

      <input
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="00000-000"
        style={{ padding: "10px 14px", fontSize: "16px", borderRadius: "6px", border: "1px solid #d1d5db" }}
      />

      <Divider />

      {carregando && <p>Buscando...</p>}
      {erro && (
        <Alert tipo="erro">
          {erro}{" "}
          <Button variant="secondary" onClick={() => setTentativa((t) => t + 1)}>Tentar novamente</Button>
        </Alert>
      )}

      {dados && !carregando && (
        <Alert tipo="sucesso">
          <strong>{dados.logradouro}</strong><br />
          {dados.bairro} — {dados.localidade}/{dados.uf}
        </Alert>
      )}
    </div>
  );
}
