import { useState } from "react"

type Passo = {
    titulo: string
    descricao: string
    arquivo?: string
    codigo: string
}

type Conceito = {
    classe: string
    explicacao: string
    preview: React.ReactNode
}

const secoes = [
    { id: "instalacao", label: "Instalação" },
    { id: "classes", label: "Classes essenciais" },
    { id: "componente", label: "Primeiro componente" },
    { id: "tema", label: "Personalizando o tema" },
]

const passos: Passo[] = [
    {
        titulo: "Instalar as dependências",
        descricao: "Instale o Tailwind CSS e o plugin oficial para o Vite.",
        arquivo: "terminal",
        codigo: "npm install tailwindcss @tailwindcss/vite",
    },
    {
        titulo: "Registrar o plugin no Vite",
        descricao: "Adicione o plugin tailwindcss() na lista de plugins do vite.config.ts.",
        arquivo: "vite.config.ts",
        codigo: `import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})`,
    },
    {
        titulo: "Importar o Tailwind no CSS",
        descricao: "Crie um arquivo CSS global contendo apenas o import do Tailwind. Na v4 não é preciso tailwind.config.js nem PostCSS.",
        arquivo: "src/index.css",
        codigo: `@import "tailwindcss";`,
    },
    {
        titulo: "Carregar o CSS na aplicação",
        descricao: "Importe o index.css no ponto de entrada do React.",
        arquivo: "src/main.tsx",
        codigo: `import './index.css'
import App from './App.tsx'`,
    },
    {
        titulo: "Rodar o projeto",
        descricao: "Suba o servidor de desenvolvimento. As classes usadas nos arquivos são detectadas automaticamente.",
        arquivo: "terminal",
        codigo: "npm run dev",
    },
]

const conceitos: Conceito[] = [
    {
        classe: "p-4 / px-6 / mt-2",
        explicacao: "Espaçamento (padding e margin). Cada unidade = 0.25rem.",
        preview: (
            <div className="flex items-end gap-1">
                {["p-1", "p-2", "p-3", "p-4"].map((p) => (
                    <div key={p} className={`${p} rounded bg-blue-200`}>
                        <div className="size-2 rounded-sm bg-blue-600" />
                    </div>
                ))}
            </div>
        ),
    },
    {
        classe: "text-lg / font-bold",
        explicacao: "Tamanho e peso da fonte.",
        preview: (
            <div className="flex items-baseline gap-2 text-slate-700">
                <span className="text-xs">Aa</span>
                <span className="text-base font-medium">Aa</span>
                <span className="text-xl font-semibold">Aa</span>
                <span className="text-3xl font-black">Aa</span>
            </div>
        ),
    },
    {
        classe: "bg-blue-600 / text-white",
        explicacao: "Cores de fundo e texto, com tons de 50 a 950.",
        preview: (
            <div className="flex overflow-hidden rounded-md">
                {["bg-blue-100", "bg-blue-300", "bg-blue-500", "bg-blue-700", "bg-blue-900"].map((c) => (
                    <div key={c} className={`${c} h-6 w-6`} />
                ))}
            </div>
        ),
    },
    {
        classe: "flex / grid / gap-4",
        explicacao: "Layout com flexbox e grid.",
        preview: (
            <div className="grid w-24 grid-cols-3 gap-1">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-3 rounded-sm bg-violet-400" />
                ))}
            </div>
        ),
    },
    {
        classe: "rounded-lg / shadow-md",
        explicacao: "Bordas arredondadas e sombras.",
        preview: (
            <div className="flex gap-2">
                <div className="size-6 rounded-none bg-white shadow-sm ring-1 ring-slate-200" />
                <div className="size-6 rounded-md bg-white shadow-md ring-1 ring-slate-200" />
                <div className="size-6 rounded-full bg-white shadow-lg ring-1 ring-slate-200" />
            </div>
        ),
    },
    {
        classe: "hover:bg-blue-700",
        explicacao: "Variantes de estado: hover, focus, active, disabled...",
        preview: (
            <span className="cursor-pointer rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white transition hover:bg-blue-800">
                passe o mouse
            </span>
        ),
    },
    {
        classe: "md:grid-cols-2",
        explicacao: "Responsivo (mobile-first): sm, md, lg, xl, 2xl.",
        preview: (
            <div className="flex items-end gap-1 text-[10px] font-mono text-slate-500">
                {[["sm", "h-3"], ["md", "h-4"], ["lg", "h-5"], ["xl", "h-6"]].map(([bp, h]) => (
                    <div key={bp} className="flex flex-col items-center gap-0.5">
                        <div className={`${h} w-5 rounded-sm bg-emerald-400`} />
                        {bp}
                    </div>
                ))}
            </div>
        ),
    },
    {
        classe: "dark:bg-gray-900",
        explicacao: "Estilos para o modo escuro do sistema.",
        preview: (
            <div className="flex overflow-hidden rounded-md ring-1 ring-slate-200">
                <div className="bg-white px-2 py-1 text-xs text-slate-700">claro</div>
                <div className="bg-slate-900 px-2 py-1 text-xs text-slate-100">escuro</div>
            </div>
        ),
    },
]

const exemploCodigo = `<button className="px-4 py-2 rounded-lg bg-blue-600 text-white
  font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition">
  Clique aqui
</button>`

const temaCodigo = `@import "tailwindcss";

@theme {
  --color-marca: #7c3aed;
  --font-titulo: "Poppins", sans-serif;
}`

function BlocoCodigo({ codigo, arquivo }: { codigo: string; arquivo?: string }) {
    const [copiado, setCopiado] = useState(false)

    async function copiar() {
        await navigator.clipboard.writeText(codigo)
        setCopiado(true)
        setTimeout(() => setCopiado(false), 1500)
    }

    return (
        <div className="overflow-hidden rounded-xl bg-slate-900 text-sm shadow-lg ring-1 ring-slate-800">
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950/60 px-4 py-2">
                <span className="size-3 rounded-full bg-red-400" />
                <span className="size-3 rounded-full bg-amber-400" />
                <span className="size-3 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-xs text-slate-400">{arquivo}</span>
                <button
                    onClick={copiar}
                    className="ml-auto rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                    {copiado ? "✓ Copiado" : "Copiar"}
                </button>
            </div>
            <pre className="overflow-x-auto p-4 font-mono leading-relaxed text-slate-100">
                <code>{codigo}</code>
            </pre>
        </div>
    )
}

function TituloSecao({ numero, titulo, subtitulo }: { numero: number; titulo: string; subtitulo: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">Passo {numero}</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{titulo}</h2>
            <p className="text-slate-500">{subtitulo}</p>
        </div>
    )
}

export default function Tailwind() {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white">
                <div className="absolute -top-24 -right-24 size-96 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-32 -left-16 size-80 rounded-full bg-cyan-300/20 blur-3xl" />

                <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-8 py-20">
                    <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/30 backdrop-blur">
                        Tutorial · Tailwind CSS v4
                    </span>
                    <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
                        Estilize mais rápido,{" "}
                        <span className="bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                            direto no JSX
                        </span>
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-blue-100">
                        Tailwind é um framework CSS <strong className="text-white">utility-first</strong>: em vez de
                        escrever CSS separado, você compõe o visual com classes pequenas e de propósito único.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="#instalacao"
                            className="rounded-lg bg-white px-5 py-2.5 font-semibold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Começar agora →
                        </a>
                        <a
                            href="https://tailwindcss.com/docs"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg px-5 py-2.5 font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/10"
                        >
                            Documentação oficial
                        </a>
                    </div>
                </div>
            </header>

            <div className="mx-auto flex max-w-6xl gap-12 px-8 py-16">
                <aside className="hidden w-52 shrink-0 lg:block">
                    <nav className="sticky top-8 flex flex-col gap-1">
                        <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Nesta página</span>
                        {secoes.map((s, i) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-white hover:text-blue-600 hover:shadow-sm"
                            >
                                <span className="flex size-6 items-center justify-center rounded-md bg-slate-200 text-xs font-bold text-slate-500 transition group-hover:bg-blue-600 group-hover:text-white">
                                    {i + 1}
                                </span>
                                {s.label}
                            </a>
                        ))}
                    </nav>
                </aside>

                <main className="flex min-w-0 flex-1 flex-col gap-20">
                    <section id="instalacao" className="flex scroll-mt-8 flex-col gap-8">
                        <TituloSecao numero={1} titulo="Instalação e configuração" subtitulo="Cinco passos e o Tailwind está rodando no seu projeto Vite." />
                        <ol className="relative flex flex-col gap-8 border-l-2 border-dashed border-blue-200 pl-8">
                            {passos.map((passo, i) => (
                                <li key={passo.titulo} className="relative flex flex-col gap-3">
                                    <span className="absolute -left-[49px] flex size-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md ring-4 ring-slate-50">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">{passo.titulo}</h3>
                                        <p className="text-sm text-slate-500">{passo.descricao}</p>
                                    </div>
                                    <BlocoCodigo codigo={passo.codigo} arquivo={passo.arquivo} />
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section id="classes" className="flex scroll-mt-8 flex-col gap-8">
                        <TituloSecao numero={2} titulo="Classes essenciais" subtitulo="As utilidades que você vai usar em quase todo componente." />
                        <div className="grid gap-4 sm:grid-cols-2">
                            {conceitos.map((c) => (
                                <div
                                    key={c.classe}
                                    className="group flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:ring-blue-300"
                                >
                                    <div className="flex h-14 items-center justify-center rounded-lg bg-slate-50 transition group-hover:bg-blue-50/60">
                                        {c.preview}
                                    </div>
                                    <div>
                                        <code className="font-mono text-sm font-semibold text-blue-600">{c.classe}</code>
                                        <p className="mt-1 text-sm text-slate-500">{c.explicacao}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="componente" className="flex scroll-mt-8 flex-col gap-8">
                        <TituloSecao numero={3} titulo="Primeiro componente" subtitulo="Combine classes para montar o visual. Passe o mouse e clique no botão." />
                        <div className="grid overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 xl:grid-cols-2">
                            <div className="flex min-h-48 items-center justify-center bg-[radial-gradient(circle,_#cbd5e1_1px,_transparent_1px)] bg-[size:16px_16px] p-10">
                                <button className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-95">
                                    Clique aqui
                                </button>
                            </div>
                            <div className="p-4">
                                <BlocoCodigo codigo={exemploCodigo} arquivo="Exemplo.tsx" />
                            </div>
                        </div>
                    </section>

                    <section id="tema" className="flex scroll-mt-8 flex-col gap-8">
                        <TituloSecao numero={4} titulo="Personalizando o tema" subtitulo="Na v4 o tema vive no próprio CSS, com a diretiva @theme." />
                        <div className="grid gap-6 md:grid-cols-5">
                            <div className="md:col-span-3">
                                <BlocoCodigo arquivo="src/index.css" codigo={temaCodigo} />
                            </div>
                            <div className="flex flex-col justify-center gap-3 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:col-span-2">
                                <p className="text-sm text-slate-600">Cada variável vira classes utilitárias automaticamente:</p>
                                <ul className="flex flex-col gap-2 font-mono text-sm">
                                    {["bg-marca", "text-marca", "border-marca", "font-titulo"].map((c) => (
                                        <li key={c} className="flex items-center gap-2 text-violet-700">
                                            <span className="size-2 rounded-full bg-violet-500" />
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="flex gap-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-6 ring-1 ring-amber-200">
                        <span className="text-2xl">💡</span>
                        <p className="text-sm leading-relaxed text-amber-900">
                            <strong>Dica:</strong> instale a extensão <em>Tailwind CSS IntelliSense</em> no VS Code para
                            ter autocomplete, preview das cores e ordenação de classes. Referência completa em{" "}
                            <a className="font-semibold underline decoration-amber-400 underline-offset-2 hover:text-amber-700" href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer">
                                tailwindcss.com/docs
                            </a>.
                        </p>
                    </section>
                </main>
            </div>
        </div>
    )
}
