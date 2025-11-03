import type { InterfacePublicUser } from '@/types/user'

type FeatureAvailabilityConfig = {
  description: string
  enableFor: boolean[]
}

type FeatureName = 'checklist' | 'invites'

export function featureAvailable(feature: FeatureName, user?: InterfacePublicUser) {
  const env = process.env.NODE_ENV

  const featureFlags: Record<string, FeatureAvailabilityConfig> = {
    checklist: {
      description: 'Funcionalidade de checklist',
      enableFor: [env === 'development', user?.role === 'admin']
    },
    invites: {
      description: 'Funcionalidade de convites',
      enableFor: [env === 'development', user?.role === 'admin']
    }
  }

  const shouldBeDisabled = featureFlags[feature].enableFor.some((value) => value === false)

  const isAvailable = !shouldBeDisabled

  return isAvailable
}
