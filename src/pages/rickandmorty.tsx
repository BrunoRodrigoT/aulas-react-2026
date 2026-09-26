import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Alert from "../components/alert";
import Badge from "../components/badge";
import Button from "../components/button";
import Grid from "../components/grid";
import Divider from "../components/divider";
import { mensagemDeErro } from "../utils/erro";

type Personagem = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  image: string;
};

type Resposta = {
  info: { pages: number; next: string | null; prev: string | null };
  results: Personagem[];
};

const badgeTipo = { Alive: "sucesso", Dead: "erro", unknown: "alerta" } as const;

export default function RickAndMorty() {
  const [pagina, setPagina] = useState(1);
  const [dados, setDados] = useState<Resposta | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function buscar() {
      setCarregando(true);
      setErro(null);
      try {
        const response = await axios.get<Resposta>(`https://rickandmortyapi.com/api/character/?page=${pagina}`);
        setDados(response.data);
      } catch (error) {
        setErro(mensagemDeErro(error));
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, [pagina]);

  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <Header>Rick and Morty</Header>
      <p style={{ color: "#6b7280", fontSize: "14px" }}>
        Paginação por página (info.pages da API) — imagens com carregamento nativo lazy.
      </p>

      {erro && <Alert tipo="erro">{erro}</Alert>}
      {carregando && <p>Carregando...</p>}

      {dados && !carregando && (
        <>
          <Grid colunas={4}>
            {dados.results.map((personagem) => (
              <div key={personagem.id} style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  padding: "12px",
              }}>
                <img
                  src={personagem.image}
                  alt={personagem.name}
                  loading="lazy"
                  style={{ width: "100%", borderRadius: "6px" }}
                />
                <strong style={{ fontSize: "14px" }}>{personagem.name}</strong>
                <Badge texto={personagem.status} tipo={badgeTipo[personagem.status]} />
              </div>
            ))}
          </Grid>

          <Divider />
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {dados.info.prev && (
              <Button variant="secondary" onClick={() => setPagina((p) => p - 1)}>Anterior</Button>
            )}
            <span style={{ color: "#6b7280", fontSize: "14px" }}>Página {pagina} de {dados.info.pages}</span>
            {dados.info.next && (
              <Button onClick={() => setPagina((p) => p + 1)}>Próxima</Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
