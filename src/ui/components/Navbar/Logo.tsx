import { useRouter } from 'next/navigation'

export function NavLogo() {
  const router = useRouter()

  return (
    <div
      className="font-medium cursor-pointer flex items-center justify-center text-brand-primary-200"
      onClick={() => router.push('/')}
    >
      Logo
    </div>
  )
}
