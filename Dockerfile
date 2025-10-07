# ---------- base (shared) ----------
FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV npm_config_ignore_scripts=false
ENV CI=true
# build tools for native deps + git for husky/prepare
RUN apt-get update && apt-get install -y --no-install-recommends \
    git python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
# prevent husky from running in CI
ENV HUSKY=0

# Optional: pass tokens if using private registry
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

# ---------- dev (hot reload) ----------
FROM base AS dev
# Copy manifests first for caching
COPY package*.json ./
# local package must be present BEFORE install
COPY @bank-app-common ./@bank-app-common
COPY tsconfig*.json ./
COPY vite.config.* ./
# Verbose logs help
RUN npm ci --foreground-scripts --no-audit --no-fund --loglevel=verbose

# App sources
COPY index.html ./
COPY src ./src
COPY public ./public

# Ensure esbuild binary is healthy
RUN npm rebuild esbuild && node -e "require('esbuild')"

CMD ["npm","run","dev","--","--host"]

# ---------- build (production build) ----------
FROM base AS build
COPY package*.json ./
COPY @bank-app-common ./@bank-app-common
COPY tsconfig*.json ./
COPY vite.config.* ./
RUN npm ci --foreground-scripts --no-audit --no-fund --loglevel=verbose

COPY index.html ./
COPY src ./src
COPY public ./public

ENV NODE_OPTIONS=--max-old-space-size=2048
RUN npm rebuild esbuild && node -e "require('esbuild')"
RUN npm run build

# ---------- runtime (nginx) ----------
FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
