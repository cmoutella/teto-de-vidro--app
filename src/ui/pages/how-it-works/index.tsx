import Icon from '@/ui/components/base/Icon'

const CONTENT_SESSIONS: { title: string; description: string; disclosure?: string }[] = [
  {
    title: 'Não temos anúncios de imóveis na plataforma',
    description:
      'Na Teto de Vidro não temos anúncios, mas ajudamos você a <strong>se organizar com imóveis de diferentes plataformas</strong>.'
  },
  {
    title: 'Trazemos os dados pra você',
    description:
      'Você não precisa preencher todas as informações sobre o imóvel, nós trazemos os dados* para você <strong>a partir do link do anúncio</strong>.',
    disclosure:
      'A disponibilidade do serviço depende da plataforma do anúncio, estamos trabalhando na integração com demais plataformas.'
  },
  {
    title: 'Mantenha o endereço do imóvel atualizado na sua busca',
    description:
      'Manter o endereço atualizado e, se possível, completo é fundamental para que a gente consiga alimentar a base de dados com informações do imóvel e opinião de quem visitou e de quem já morou ali.'
  },
  {
    title: 'Como mantemos você seguro?',
    description:
      'No processo de alimetar a base de dados usamos apenas informações sobre o imóvel. Por exemplo: ao registrar os comentários, não será exposto o autor.'
  },
  {
    title: 'Como mantemos terceiros seguros?',
    description: `Nosso sistema filtra os comentários marcando-os como: <strong>ofensivos</strong> quando há insultos a terceiros, <strong>violação de segurança</strong> quando o comentário expõe sistemas de segurança de terceiros, ou que exponham dados pessoais seus ou de terceiros, ou <strong>aprovados</strong> quando eles passam nos filtros. Comentários não aprovados serão registrados para que sejam consultados no futuro. Sem isso não conseguimos vincular os comentários aos imóveis.`,
    disclosure: 'Verificação feita com IA'
  },
  {
    title: 'Como você mantém terceiros seguros?',
    description: `Evite comentários que exponham nomes de terceiros, nunca exponha o horário de funcionários, informações de contato ou localização de dispositivos de segurança.`
  }
]

export function HowItWorksView() {
  return (
    <div className="flex justify-center">
      <div className="container px-2 mt-4 pb-20 max-w-[740px] text-brand-primary-900">
        <div className="py-8 mb-6 text-center">
          <h1 className="mb-6 text-2xl md:text-3xl font-semibold">Como funciona</h1>
          <h2 className="flex flex-col gap-1.5 text-sm md:text-lg tracking-tight">
            <span>Aqui você vai entender o que é possível fazer</span>
            <span>e o que podemos fazer juntos para essa idéia dar certo!</span>
          </h2>
        </div>
        <div className="flex flex-col gap-10">
          {CONTENT_SESSIONS.map((session) => {
            return (
              <div key={session.title}>
                <h4 className="text-xl mb-3 font-semibold flex items-start md:items-center gap-2">
                  <Icon icon="chevron-double-right" className="-traslate-y-0.5" size="md" />
                  {session.title}
                </h4>
                <p
                  className="text-base pl-8"
                  dangerouslySetInnerHTML={{ __html: session.description }}
                />
                {session.disclosure && <p className="text-xs mt-2 pl-8">* {session.disclosure}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
