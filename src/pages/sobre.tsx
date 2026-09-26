import Header from "../components/header";
import Badge from "../components/badge";

export default function Sobre() {
  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "700px" }}>
      <Header>Sobre</Header>
      <p style={{ color: "#374151", lineHeight: 1.6 }}>
        Este projeto é uma vitrine de componentes React reutilizáveis, construídos
        sem hooks, usando apenas props e composição para demonstrar a eficiência
        do React na hora de reaproveitar código de interface.
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <Badge texto="React" tipo="info" />
        <Badge texto="TypeScript" tipo="info" />
        <Badge texto="Vite" tipo="info" />
        <Badge texto="React Router" tipo="info" />
      </div>
    </div>
  )
}
