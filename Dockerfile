# ---------- base (shared) ----------
FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV npm_config_ignore_scripts=false
ENV CI=true
# Tools for native builds + git (often needed by prepare/husky/scripts)
RUN apt-get update && apt-get install -y --no-install-recommends \
    git python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
# Disable husky in CI (prevents prepare hook crashes)
ENV HUSKY=0

# Optional: auth for private registries (pass via --build-arg NPM_TOKEN=xxx)
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

# ---------- dev/build ----------
FROM base AS build
# Copy manifests first
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY @bank-app-common ./@bank-app-common
# Copy local package BEFORE install (critical for file:/ workspaces)
COPY @bank-app-common ./@bank-app-common

# Show env + verify files exist
RUN node -v && npm -v && ls -la && ls -la @bank-app-common || true
RUN test -f package-lock.json || (echo "package-lock.json missing" && exit 1)

# Run npm ci and on failure print the full npm debug log
RUN npm ci --foreground-scripts --no-audit --no-fund --loglevel=verbose \
  || (echo "------ npm debug logs ------" \
      && (ls -1 /root/.npm/_logs || true) \
      && (cat /root/.npm/_logs/*-debug-*.log || true) \
      && exit 1)

# continue your build as before...
COPY index.html ./
COPY src ./src
COPY public ./public
ENV NODE_OPTIONS=--max-old-space-size=2048
RUN npm rebuild esbuild && node -e "require('esbuild')"
RUN npm run build

# ---------- runtime ----------
FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
