type Props = {
    texto: string
    tipo?: "sucesso" | "alerta" | "erro" | "info"
}

const estilos = {
    sucesso: { bg: "#dcfce7", cor: "#166534" },
    alerta: { bg: "#fef9c3", cor: "#854d0e" },
    erro: { bg: "#fee2e2", cor: "#991b1b" },
    info: { bg: "#dbeafe", cor: "#1e40af" },
}

export default function Badge({ texto, tipo = "info" }: Props) {
  const estilo = estilos[tipo]
  return (
    <span style={{
        backgroundColor: estilo.bg,
        color: estilo.cor,
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "13px",
        fontWeight: 600,
    }}>
      {texto}
    </span>
  )
}
