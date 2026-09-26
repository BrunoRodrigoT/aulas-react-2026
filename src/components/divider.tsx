type Props = {
    texto?: string
}

export default function Divider({ texto }: Props) {
  if (!texto) {
    return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "24px 0" }} />
  }

  return (
    <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        margin: "24px 0",
        color: "#9ca3af",
        fontSize: "14px",
    }}>
      <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
      {texto}
      <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
    </div>
  )
}
