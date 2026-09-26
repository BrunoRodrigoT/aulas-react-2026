import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Alert from "../components/alert";
import Badge from "../components/badge";
import Button from "../components/button";
import Divider from "../components/divider";
import { mensagemDeErro } from "../utils/erro";

type ListaPokemon = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

type DetalhePokemon = {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
};

const LIMITE = 20;

export default function PokeApi() {
  const [offset, setOffset] = useState(0);
  const [lista, setLista] = useState<ListaPokemon | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [expandido, setExpandido] = useState<string | null>(null);
  const [detalhes, setDetalhes] = useState<Record<string, DetalhePokemon>>({});
  const [carregandoDetalhe, setCarregandoDetalhe] = useState<string | null>(null);

  useEffect(() => {
    async function buscar() {
      setCarregando(true);
      setErro(null);
      try {
        const response = await axios.get<ListaPokemon>(`https://pokeapi.co/api/v2/pokemon?limit=${LIMITE}&offset=${offset}`);
        setLista(response.data);
      } catch (error) {
        setErro(mensagemDeErro(error));
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, [offset]);

  async function alternarDetalhe(nome: string) {
    if (expandido === nome) {
      setExpandido(null);
      return;
    }
    setExpandido(nome);

    if (detalhes[nome]) return;

    setCarregandoDetalhe(nome);
    try {
      const response = await axios.get<DetalhePokemon>(`https://pokeapi.co/api/v2/pokemon/${nome}`);
      setDetalhes((atual) => ({ ...atual, [nome]: response.data }));
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregandoDetalhe(null);
    }
  }

  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "500px" }}>
      <Header>PokéAPI</Header>
      <p style={{ color: "#6b7280", fontSize: "14px" }}>
        Paginação por offset — os detalhes de cada pokémon só são carregados (lazy) quando você clica no nome.
      </p>

      {erro && <Alert tipo="erro">{erro}</Alert>}
      {carregando && <p>Carregando...</p>}

      {lista && !carregando && (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {lista.results.map((pokemon) => (
              <div key={pokemon.name} style={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #eee",
                  borderRadius: "6px",
                  padding: "10px 14px",
              }}>
                <div
                  onClick={() => alternarDetalhe(pokemon.name)}
                  style={{ cursor: "pointer", textTransform: "capitalize", fontWeight: 500 }}
                >
                  {pokemon.name}
                </div>

                {expandido === pokemon.name && (
                  <div style={{ marginTop: "8px" }}>
                    {carregandoDetalhe === pokemon.name && <p>Carregando detalhes...</p>}
                    {detalhes[pokemon.name] && (
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img src={detalhes[pokemon.name].sprites.front_default} alt={pokemon.name} width={64} height={64} loading="lazy" />
                        <div style={{ display: "flex", gap: "6px" }}>
                          {detalhes[pokemon.name].types.map((t) => (
                            <Badge key={t.type.name} texto={t.type.name} tipo="info" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Divider />
          <div style={{ display: "flex", gap: "12px" }}>
            {offset > 0 && (
              <Button variant="secondary" onClick={() => setOffset((o) => Math.max(0, o - LIMITE))}>
                Anterior
              </Button>
            )}
            {lista.next && (
              <Button onClick={() => setOffset((o) => o + LIMITE)}>
                Próxima
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
