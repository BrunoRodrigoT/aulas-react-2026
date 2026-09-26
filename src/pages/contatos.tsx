import { useEffect, useState } from "react";
import Header from "../components/header";
import Alert from "../components/alert";
import axios from "axios"; 

type Pokemon = {
  name: string;
  url: string;
}

export default function Contatos() {
  
  const [dados, setDados] = useState<Pokemon | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function buscar() {
      try {
        const response = await axios.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/charmeleon");
        setDados(response.data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, []);
  
  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "500px" }}>
      <Header>Pokemon</Header>
      {erro && <Alert tipo="erro">{erro}</Alert>}

      {carregando && <p>Carregando...</p>}

      {dados && (
       <>
       <p>{dados.name}</p> 
       <p>{dados.types[0].type.name}</p> 
       </>

      )}
    </div>
  )
}
