# AIRI Server Auth UI

Auth UI for the hosted AIRI server. It is a Vue/Vite app deployed separately from `apps/server` and used for Better Auth sign-in, email verification, password reset, profile, and Electron OIDC callback relay flows.

## Use When

- Building user-facing auth pages backed by server `/api/auth/*` endpoints.
- Updating login, sign-up, verification, reset-password, account profile, or Electron auth relay UX.
- Deploying the auth surface to Cloudflare Workers Static Assets.

## Do Not Use When

- Building the main stage app sign-in callback pages that consume OIDC tokens.
- Adding admin-only operational pages. Those belong in `apps/ui-admin`.

## Commands

```sh
pnpm -F @proj-airi/ui-server-auth dev
pnpm -F @proj-airi/ui-server-auth typecheck
pnpm -F @proj-airi/ui-server-auth build
```

## Deployment

`pnpm -F @proj-airi/ui-server-auth build` writes to `apps/ui-server-auth/dist`. Assets are emitted under `dist/auth/assets` because the app is served with the `/auth/` Vite base path. Cloudflare Pages uses `public/_redirects` to route `/auth/*` back to the SPA HTML.

The production GitHub Actions workflow deploys this app to the Cloudflare Pages project `moeru-ai-airi-auth` with separate auth-account credentials:

```sh
AUTH_CLOUDFLARE_ACCOUNT_ID=...
AUTH_CLOUDFLARE_API_TOKEN=...
```

`apps/ui-server-auth/wrangler.toml` remains available for Workers Static Assets deployments, but production CI uses Cloudflare Pages direct upload.

Production expects:

```sh
VITE_SERVER_URL=https://api.airi.build
```

The server redirects historical `/auth/*` URLs to `AUTH_UI_URL`, which defaults to `https://auth.airi.build/auth`.
