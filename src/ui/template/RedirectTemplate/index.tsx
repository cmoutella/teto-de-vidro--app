import PublicNavbar from '@ui/Navbar/PublicNavbar'

interface RedirectTemplateProps {
  description: string
}

const RedirectTemplate = ({ description }: RedirectTemplateProps) => {
  return (
    <div className="w-full min-h-full">
      <PublicNavbar />
      <div>
        <h2>Você está sendo redirecionado</h2>

        <p>{description}</p>
      </div>
    </div>
  )
}

export default RedirectTemplate
