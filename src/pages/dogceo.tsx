import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Alert from "../components/alert";
import Button from "../components/button";
import Divider from "../components/divider";
import Grid from "../components/grid";
import { mensagemDeErro } from "../utils/erro";

const QTD_POR_CARGA = 8;

export default function DogCeo() {
  const [racas, setRacas] = useState<string[]>([]);
  const [racaEscolhida, setRacaEscolhida] = useState("");
  const [imagens, setImagens] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<{ message: Record<string, string[]> }>("https://dog.ceo/api/breeds/list/all")
      .then((response) => setRacas(Object.keys(response.data.message)))
      .catch((error) => setErro(mensagemDeErro(error)));
  }, []);

  async function carregarMais() {
    setCarregando(true);
    setErro(null);
    try {
      const url = racaEscolhida
        ? `https://dog.ceo/api/breed/${racaEscolhida}/images/random/${QTD_POR_CARGA}`
        : `https://dog.ceo/api/breeds/image/random/${QTD_POR_CARGA}`;
      const response = await axios.get<{ message: string[] }>(url);
      setImagens((atual) => [...atual, ...response.data.message]);
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  function trocarRaca(raca: string) {
    setRacaEscolhida(raca);
    setImagens([]);
  }

  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <Header>Dog CEO</Header>
      <p style={{ color: "#6b7280", fontSize: "14px" }}>
        Escolha uma raça e clique em "Carregar mais" — as imagens usam lazy loading nativo do navegador.
      </p>

      {erro && <Alert tipo="erro">{erro}</Alert>}

      <select
        value={racaEscolhida}
        onChange={(e) => trocarRaca(e.target.value)}
        style={{ padding: "10px 14px", fontSize: "16px", borderRadius: "6px", border: "1px solid #d1d5db", maxWidth: "260px" }}
      >
        <option value="">Todas as raças</option>
        {racas.map((raca) => (
          <option key={raca} value={raca}>{raca}</option>
        ))}
      </select>

      <Divider />

      <Grid colunas={4}>
        {imagens.map((url) => (
          <img
            key={url}
            src={url}
            alt="cachorro"
            loading="lazy"
            style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }}
          />
        ))}
      </Grid>

      <Button onClick={carregarMais}>
        {carregando ? "Carregando..." : "Carregar mais"}
      </Button>
    </div>
  );
}
