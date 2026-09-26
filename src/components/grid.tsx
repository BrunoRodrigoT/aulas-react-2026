type Props = {
    children: React.ReactNode
    colunas?: number
    gap?: number
}

export default function Grid({ children, colunas = 3, gap = 16 }: Props) {
  return (
    <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${colunas}, 1fr)`,
        gap: `${gap}px`,
    }}>
      {children}
    </div>
  )
}
