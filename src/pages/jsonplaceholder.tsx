import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Alert from "../components/alert";
import Button from "../components/button";
import Divider from "../components/divider";
import { mensagemDeErro } from "../utils/erro";

type Post = { id: number; title: string; body: string };
type Comentario = { id: number; name: string; email: string };

const POR_PAGINA = 10;

export default function JsonPlaceholder() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);

  const [expandido, setExpandido] = useState<number | null>(null);
  const [comentarios, setComentarios] = useState<Record<number, Comentario[]>>({});
  const [carregandoComentarios, setCarregandoComentarios] = useState<number | null>(null);

  useEffect(() => {
    async function buscar() {
      setCarregando(true);
      setErro(null);
      try {
        const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts", { timeout: 4000 });
        setPosts(response.data);
      } catch (error) {
        setErro(
          axios.isAxiosError(error) && error.code === "ECONNABORTED"
            ? "Tempo de resposta esgotado (timeout de 4s)."
            : mensagemDeErro(error)
        );
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, [tentativa]);

  async function alternarComentarios(postId: number) {
    if (expandido === postId) {
      setExpandido(null);
      return;
    }
    setExpandido(postId);
    if (comentarios[postId]) return;

    setCarregandoComentarios(postId);
    try {
      const response = await axios.get<Comentario[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      setComentarios((atual) => ({ ...atual, [postId]: response.data }));
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregandoComentarios(null);
    }
  }

  const totalPaginas = posts ? Math.ceil(posts.length / POR_PAGINA) : 0;
  const postsPagina = posts?.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA) ?? [];

  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "600px" }}>
      <Header>JSONPlaceholder</Header>
      <p style={{ color: "#6b7280", fontSize: "14px" }}>
        Paginação client-side, requisição com timeout de 4s e refetch manual. Clique num post para carregar os comentários (lazy).
      </p>

      {erro && (
        <Alert tipo="erro">
          {erro}{" "}
          <Button variant="secondary" onClick={() => setTentativa((t) => t + 1)}>Tentar novamente</Button>
        </Alert>
      )}
      {carregando && <p>Carregando...</p>}

      {posts && !carregando && (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {postsPagina.map((post) => (
              <div key={post.id} style={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #eee",
                  borderRadius: "6px",
                  padding: "10px 14px",
              }}>
                <div onClick={() => alternarComentarios(post.id)} style={{ cursor: "pointer" }}>
                  <strong style={{ fontSize: "14px", textTransform: "capitalize" }}>{post.title}</strong>
                </div>

                {expandido === post.id && (
                  <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    {carregandoComentarios === post.id && <p>Carregando comentários...</p>}
                    {comentarios[post.id]?.map((comentario) => (
                      <div key={comentario.id} style={{ fontSize: "13px", color: "#374151" }}>
                        <strong>{comentario.name}</strong> — {comentario.email}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Divider />
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {pagina > 1 && (
              <Button variant="secondary" onClick={() => setPagina((p) => p - 1)}>Anterior</Button>
            )}
            <span style={{ color: "#6b7280", fontSize: "14px" }}>Página {pagina} de {totalPaginas}</span>
            {pagina < totalPaginas && (
              <Button onClick={() => setPagina((p) => p + 1)}>Próxima</Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
