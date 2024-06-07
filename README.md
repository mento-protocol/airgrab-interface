# Mento Airdrop UI

This DApp lets users:

- Check their airdrop eligibility and allocation based on [the snapshot repo](https://github.com/mento-protocol/airgrab-snapshot)
- KYC to further confirm eligibility
- Claim their allocation via various claiming options

## Architecture

- Next.js
- React
- Tailwind CSS
- Wagmi
- Rainbow Kit

## Run Locally

1. Install deps: `pnpm i`
2. Copy environment variables to local: `cp env.example env.local`
3. Log in to GCloud on your terminal: `gcloud auth login`
4. Pull the necessary secrets: `pnpm secrets:get`
   - In case this fails with `PERMISSION DENIED` you'll need to request permissions in GCloud from an admin
5. Start server: `pnpm dev`

## Deploy

Deployments happen automatically via Vercel's Github app after pushing branch updates.

## Stay in touch

- Author - [Mento Labs](https://mentolabs.xyz)
- Twitter - [@mentolabs](https://twitter.com/mentolabs)
