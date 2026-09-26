type Produto = {
    titulo: string;
    preco: number;
    descricao: string;
    img: string;
    precoAntigo?: number;
    parcelas?: number;
    freteGratis?: boolean;
    avaliacao?: number;
    numAvaliacoes?: number;
}

type Props = {
    items: Produto[]
}

function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function Estrelas({ nota, total }: { nota: number; total: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <div style={{ display: "flex", color: "#3483fa", fontSize: "14px" }}>
        {[1, 2, 3, 4, 5].map((posicao) => (
          <span key={posicao} style={{ color: posicao <= Math.round(nota) ? "#3483fa" : "#d9d9d9" }}>
            ★
          </span>
        ))}
      </div>
      <span style={{ fontSize: "12px", color: "#999" }}>({total})</span>
    </div>
  )
}

export default function CardList({items}: Props) {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '16px'}}>
      {items.map((item) => {
        const desconto = item.precoAntigo
          ? Math.round(100 - (item.preco / item.precoAntigo) * 100)
          : null

        return (
          <div key={item.titulo} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              backgroundColor: '#fff',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #eee',
              width: '220px',
          }}>
            <div style={{
                height: '160px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
              <img src={item.img} alt={item.titulo} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}/>
            </div>

            <p style={{
                fontSize: '14px',
                color: '#333',
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
            }}>
              {item.titulo}
            </p>

            {item.avaliacao != null && item.numAvaliacoes != null && (
              <Estrelas nota={item.avaliacao} total={item.numAvaliacoes} />
            )}

            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
              {item.precoAntigo && (
                <span style={{ fontSize: '13px', color: '#999', textDecoration: 'line-through' }}>
                  {formatarPreco(item.precoAntigo)}
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '22px', fontWeight: 600, color: '#333' }}>
                  {formatarPreco(item.preco)}
                </span>
                {desconto && desconto > 0 && (
                  <span style={{ fontSize: '14px', color: '#00a650', fontWeight: 600 }}>
                    {desconto}% OFF
                  </span>
                )}
              </div>
              {item.parcelas && item.parcelas > 1 && (
                <span style={{ fontSize: '13px', color: '#00a650' }}>
                  em {item.parcelas}x {formatarPreco(item.preco / item.parcelas)} sem juros
                </span>
              )}
            </div>

            {item.freteGratis && (
              <span style={{ fontSize: '13px', color: '#00a650', fontWeight: 600, marginTop: '2px' }}>
                Frete grátis
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
