import { describe, expect, it } from 'vitest'

import { buildAuthUiRedirectUrl, buildAuthUiUrl } from '../auth-ui'

describe('auth UI URL helpers', () => {
  it('builds auth UI URLs under the configured auth base path', () => {
    expect(buildAuthUiUrl('https://auth.airi.build/ui', '/sign-in', '?client_id=web')).toBe(
      'https://auth.airi.build/ui/sign-in?client_id=web',
    )
  })

  it('maps server /auth requests to the standalone auth UI while preserving queries', () => {
    expect(buildAuthUiRedirectUrl(
      'https://auth.airi.build/ui/',
      'https://api.airi.build/auth/verify-email?verified=true',
    )).toBe('https://auth.airi.build/ui/verify-email?verified=true')
  })
})
