type Props = {
    nome: string
    img?: string
    tamanho?: number
}

export default function Avatar({ nome, img, tamanho = 48 }: Props) {
  const iniciais = nome
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase()

  const estiloBase = {
    width: tamanho,
    height: tamanho,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: tamanho / 2.5,
  }

  if (img) {
    return <img src={img} alt={nome} style={{ ...estiloBase, objectFit: "cover" }} />
  }

  return (
    <div style={{ ...estiloBase, backgroundColor: "#e5e7eb", color: "#374151" }}>
      {iniciais}
    </div>
  )
}
