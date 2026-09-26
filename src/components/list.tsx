type Props<T> = {
    items: T[]
    getKey: (item: T) => string | number
    renderItem: (item: T) => React.ReactNode
}

export default function List<T>({ items, getKey, renderItem }: Props<T>) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
      {items.map((item) => (
        <li key={getKey(item)} style={{
            padding: "10px 14px",
            backgroundColor: "#f9fafb",
            borderRadius: "6px",
            border: "1px solid #eee",
        }}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
