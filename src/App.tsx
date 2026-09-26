import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Sobre from "./pages/sobre";
import Contatos from "./pages/contatos";
import ViaCep from "./pages/viacep";
import PokeApi from "./pages/pokeapi";
import RickAndMorty from "./pages/rickandmorty";
import JsonPlaceholder from "./pages/jsonplaceholder";
import DogCeo from "./pages/dogceo";
import TheCatApi from "./pages/thecatapi";
import Tailwind from "./pages/tailwind";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="contatos" element={<Contatos />} />
          <Route path="viacep" element={<ViaCep />} />
          <Route path="pokeapi" element={<PokeApi />} />
          <Route path="rickandmorty" element={<RickAndMorty />} />
          <Route path="jsonplaceholder" element={<JsonPlaceholder />} />
          <Route path="dogceo" element={<DogCeo />} />
          <Route path="thecatapi" element={<TheCatApi />} />
          <Route path="tailwind" element={<Tailwind />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
