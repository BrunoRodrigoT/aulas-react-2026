type Props = {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "danger"
    onClick?: () => void
}

const cores = {
    primary: "#2563eb",
    secondary: "#6b7280",
    danger: "#dc2626",
}

export default function Button({ children, variant = "primary", onClick }: Props) {
  return (
    <button
        onClick={onClick}
        style={{
            backgroundColor: cores[variant],
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "10px 18px",
            fontSize: "16px",
            cursor: "pointer",
        }}
    >
      {children}
    </button>
  )
}
