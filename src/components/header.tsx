type Props = {
    children: React.ReactNode
    color?: string
}

export default function Header({children, color}: Props) {
  return (
    <h1 style={{
        fontSize: '48px',
        color: color ?? "#2d2d2d",
    }}>{children}</h1>
  )
}