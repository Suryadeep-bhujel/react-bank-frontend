# ---------- base (shared) ----------
FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV npm_config_ignore_scripts=false
ENV CI=true
RUN apt-get update && apt-get install -y --no-install-recommends \
    git python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
ENV HUSKY=0

ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

# ---------- dev ----------
FROM base AS dev
# copy only what’s needed to install deps
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY @bank-app-common ./@bank-app-common
# install deps for dev
RUN npm ci --foreground-scripts --no-audit --no-fund
EXPOSE 5173
CMD ["npm","run","dev","--","--host","0.0.0.0"]

# ---------- build ----------
FROM base AS build
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY @bank-app-common ./@bank-app-common

# sanity + ensure lockfile exists
RUN node -v && npm -v && ls -la && ls -la @bank-app-common || true
RUN test -f package-lock.json || (echo "package-lock.json missing" && exit 1)

RUN npm ci --foreground-scripts --no-audit --no-fund --loglevel=verbose \
  || (echo "------ npm debug logs ------" \
      && (ls -1 /root/.npm/_logs || true) \
      && (cat /root/.npm/_logs/*-debug-*.log || true) \
      && exit 1)

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
