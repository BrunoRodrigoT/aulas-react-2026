import CardList from "../components/card-list";
import Header from "../components/header";
import Button from "../components/button";
import Badge from "../components/badge";
import Alert from "../components/alert";
import Avatar from "../components/avatar";
import ProgressBar from "../components/progress-bar";
import Divider from "../components/divider";
import Grid from "../components/grid";
import List from "../components/list";
import TodoList from "../components/todo-list";

export default function Home() {

  const produtos = [
    {
      titulo: "Iphone 12 pro max 128gb",
      preco: 5000,
      precoAntigo: 6200,
      descricao: "Iphone 12 pro max 128gb",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFjeOmrwVgOSHIwiuhH3zrnylL-91FcAW41fBhM86JAQ&s=10",
      parcelas: 12,
      freteGratis: true,
      avaliacao: 4.5,
      numAvaliacoes: 328,
    },
    {
      titulo: "Macbook M6 pro 256gb",
      preco: 15000,
      descricao: "Macbook M6 pro 256gb",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR58b7ImUuvLoFEf79BaywZrw3vJG5dwHoRw7otHLVvYg&s=10",
      parcelas: 10,
      freteGratis: true,
      avaliacao: 5,
      numAvaliacoes: 91,
    },
    {
      titulo: "Playstation 5 1tb",
      preco: 5000,
      precoAntigo: 5500,
      descricao: "Playstation 5 1tb",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR58b7ImUuvLoFEf79BaywZrw3vJG5dwHoRw7otHLVvYg&s=10",
      parcelas: 6,
      avaliacao: 4,
      numAvaliacoes: 1204,
    },
  ]

  const usuarios = [
    { id: 1, nome: "Ana Souza", cargo: "Frontend" },
    { id: 2, nome: "Bruno Rodrigo", cargo: "Fullstack" },
    { id: 3, nome: "Carla Lima", cargo: "Design" },
  ]

  const tarefas = [
    { id: 1, texto: "Estudar componentes", feito: true },
    { id: 2, texto: "Estudar props", feito: true },
    { id: 3, texto: "Estudar hooks", feito: false },
  ]

  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>

      <Header>Componentes React</Header>

      <Divider texto="Button — mesmo componente, props diferentes" />
      <div style={{ display: "flex", gap: "12px" }}>
        <Button variant="primary">Confirmar</Button>
        <Button variant="secondary">Cancelar</Button>
        <Button variant="danger">Excluir</Button>
      </div>

      <Divider texto="Badge" />
      <div style={{ display: "flex", gap: "8px" }}>
        <Badge texto="Pago" tipo="sucesso" />
        <Badge texto="Pendente" tipo="alerta" />
        <Badge texto="Cancelado" tipo="erro" />
        <Badge texto="Novo" tipo="info" />
      </div>

      <Divider texto="Alert" />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Alert tipo="sucesso">Cadastro realizado com sucesso!</Alert>
        <Alert tipo="alerta">Sua sessão expira em 5 minutos.</Alert>
        <Alert tipo="erro">Não foi possível salvar as alterações.</Alert>
      </div>

      <Divider texto="Avatar" />
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Avatar nome="Bruno Rodrigo" />
        <Avatar nome="Ana Souza" tamanho={64} />
        <Avatar nome="Carla Lima" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFjeOmrwVgOSHIwiuhH3zrnylL-91FcAW41fBhM86JAQ&s=10" tamanho={48} />
      </div>

      <Divider texto="ProgressBar" />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "300px" }}>
        <ProgressBar valor={30} cor="#dc2626" />
        <ProgressBar valor={65} cor="#f59e0b" />
        <ProgressBar valor={90} cor="#22c55e" />
      </div>

      <Divider texto="List genérica — mesmo componente, conteúdos diferentes" />
      <List
        items={usuarios}
        getKey={(u) => u.id}
        renderItem={(u) => <span>{u.nome} — <strong>{u.cargo}</strong></span>}
      />
      <List
        items={tarefas}
        getKey={(t) => t.id}
        renderItem={(t) => <span style={{ textDecoration: t.feito ? "line-through" : "none" }}>{t.texto}</span>}
      />

      <Divider texto="Grid — layout reutilizável" />
      <Grid colunas={3}>
        <Alert tipo="sucesso">Célula 1</Alert>
        <Alert tipo="alerta">Célula 2</Alert>
        <Alert tipo="erro">Célula 3</Alert>
      </Grid>

      <Divider texto="CardList (componente já existente)" />
      <CardList items={produtos} />

      <Divider texto="To-Do List (localStorage)" />
      <TodoList />

    </div>
  )
}
