type Props = {
    children: React.ReactNode
    tipo?: "sucesso" | "alerta" | "erro"
}

const estilos = {
    sucesso: { bg: "#f0fdf4", borda: "#22c55e", cor: "#166534" },
    alerta: { bg: "#fffbeb", borda: "#f59e0b", cor: "#92400e" },
    erro: { bg: "#fef2f2", borda: "#ef4444", cor: "#991b1b" },
}

export default function Alert({ children, tipo = "alerta" }: Props) {
  const estilo = estilos[tipo]
  return (
    <div style={{
        backgroundColor: estilo.bg,
        borderLeft: `4px solid ${estilo.borda}`,
        color: estilo.cor,
        padding: "12px 16px",
        borderRadius: "4px",
    }}>
      {children}
    </div>
  )
}
