import { useEffect, useState } from "react"
import Button from "./button"
import List from "./list"

type Tarefa = {
  id: number
  texto: string
  feito: boolean
}

const CHAVE_STORAGE = "todo-list"

export default function TodoList() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(() => {
    const salvo = localStorage.getItem(CHAVE_STORAGE)
    return salvo ? JSON.parse(salvo) : []
  })
  const [texto, setTexto] = useState("")

  useEffect(() => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas))
  }, [tarefas])

  function adicionarTarefa(e: React.FormEvent) {
    e.preventDefault()
    const texto2 = texto.trim()
    if (!texto2) return

    setTarefas([...tarefas, { id: Date.now(), texto: texto2, feito: false }])
    setTexto("")
  }

  function alternarFeito(id: number) {
    setTarefas(tarefas.map((t) => (t.id === id ? { ...t, feito: !t.feito } : t)))
  }

  function removerTarefa(id: number) {
    setTarefas(tarefas.filter((t) => t.id !== id))
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <form onSubmit={adicionarTarefa} style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Nova tarefa"
          style={{
            flex: 1,
            padding: "10px 14px",
            fontSize: "16px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
          }}
        />
        <Button variant="primary">Adicionar</Button>
      </form>

      {tarefas.length === 0 ? (
        <span style={{ color: "#999" }}>Nenhuma tarefa ainda</span>
      ) : (
        <List
          items={tarefas}
          getKey={(t) => t.id}
          renderItem={(t) => (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input type="checkbox" checked={t.feito} onChange={() => alternarFeito(t.id)} />
              <span style={{ flex: 1, textDecoration: t.feito ? "line-through" : "none" }}>
                {t.texto}
              </span>
              <Button variant="danger" onClick={() => removerTarefa(t.id)}>Remover</Button>
            </div>
          )}
        />
      )}
    </div>
  )
}
