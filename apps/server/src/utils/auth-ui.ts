export const SERVER_AUTH_UI_BASE_PATH = '/auth'

/**
 * Builds an absolute URL inside the externally hosted auth UI.
 *
 * Use when:
 * - Redirecting server-owned auth UI entrypoints to the standalone
 *   `apps/ui-server-auth` deployment.
 * - Preserving query parameters from OIDC, verification, or reset flows.
 *
 * Expects:
 * - `authUiUrl` is the public auth UI base, usually ending in `/auth`.
 * - `path` is the route path within the auth UI router.
 *
 * Returns:
 * - An absolute URL with the auth UI base path, normalized path, and search.
 */
export function buildAuthUiUrl(authUiUrl: string, path: string, search = ''): string {
  const target = new URL(authUiUrl)
  const basePath = target.pathname.replace(/\/+$/, '')
  const routePath = path.startsWith('/') ? path : `/${path}`

  target.pathname = `${basePath}${routePath}`
  target.search = search
  target.hash = ''

  return target.toString()
}

/**
 * Maps a server `/auth/*` request to the standalone auth UI.
 *
 * Use when:
 * - The server keeps owning the historical `/auth/*` entrypoint but no longer
 *   packages the auth UI bundle.
 *
 * Expects:
 * - `requestUrl` is the incoming server URL.
 * - `authUiUrl` points to the standalone auth UI base path.
 *
 * Returns:
 * - The external auth UI URL preserving route suffix and query string.
 */
export function buildAuthUiRedirectUrl(authUiUrl: string, requestUrl: string): string {
  const request = new URL(requestUrl)
  const suffix = request.pathname === SERVER_AUTH_UI_BASE_PATH
    ? '/'
    : request.pathname.slice(SERVER_AUTH_UI_BASE_PATH.length) || '/'

  return buildAuthUiUrl(authUiUrl, suffix, request.search)
}
