import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Alert from "../components/alert";
import Grid from "../components/grid";
import { mensagemDeErro } from "../utils/erro";

type Gato = { id: string; url: string };

const POR_PAGINA = 10;

export default function TheCatApi() {
  const [imagens, setImagens] = useState<Gato[]>([]);
  const [pagina, setPagina] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const sentinelaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function buscar() {
      setCarregando(true);
      setErro(null);
      try {
        const response = await axios.get<Gato[]>("https://api.thecatapi.com/v1/images/search", {
          params: { limit: POR_PAGINA, page: pagina },
        });
        setImagens((atual) => [...atual, ...response.data]);
      } catch (error) {
        setErro(mensagemDeErro(error));
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, [pagina]);

  useEffect(() => {
    const sentinela = sentinelaRef.current;
    if (!sentinela) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting && !carregando) {
          setPagina((p) => p + 1);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinela);
    return () => observer.disconnect();
  }, [carregando]);

  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <Header>TheCatAPI</Header>
      <p style={{ color: "#6b7280", fontSize: "14px" }}>
        Infinite scroll — rolar até o fim dispara automaticamente a próxima página via IntersectionObserver.
      </p>

      {erro && <Alert tipo="erro">{erro}</Alert>}

      <Grid colunas={5}>
        {imagens.map((gato) => (
          <img
            key={gato.id}
            src={gato.url}
            alt="gato"
            loading="lazy"
            style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px" }}
          />
        ))}
      </Grid>

      <div ref={sentinelaRef} style={{ textAlign: "center", color: "#9ca3af", fontSize: "14px", padding: "12px" }}>
        {carregando ? "Carregando mais..." : "Role para carregar mais"}
      </div>
    </div>
  );
}
