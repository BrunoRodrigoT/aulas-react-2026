import { Link, Outlet, useLocation } from "react-router-dom"

const links = [
    { to: "/", label: "Home" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contatos", label: "Contatos" },
    { to: "/viacep", label: "ViaCEP" },
    { to: "/pokeapi", label: "PokéAPI" },
    { to: "/rickandmorty", label: "Rick and Morty" },
    { to: "/jsonplaceholder", label: "JSONPlaceholder" },
    { to: "/dogceo", label: "Dog CEO" },
    { to: "/thecatapi", label: "TheCatAPI" },
    { to: "/tailwind", label: "Tailwind" },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <nav style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "16px 32px",
          borderBottom: "1px solid #eee",
          backgroundColor: "#fff",
      }}>
        {links.map((link) => {
          const ativo = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                  textDecoration: "none",
                  color: ativo ? "#2563eb" : "#374151",
                  fontWeight: ativo ? 700 : 500,
                  fontSize: "16px",
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <Outlet />
    </div>
  )
}
