type Props = {
    valor: number
    cor?: string
}

export default function ProgressBar({ valor, cor = "#2563eb" }: Props) {
  const percentual = Math.min(100, Math.max(0, valor))
  return (
    <div style={{
        width: "100%",
        backgroundColor: "#e5e7eb",
        borderRadius: "999px",
        height: "12px",
        overflow: "hidden",
    }}>
      <div style={{
          width: `${percentual}%`,
          backgroundColor: cor,
          height: "100%",
          borderRadius: "999px",
      }} />
    </div>
  )
}
