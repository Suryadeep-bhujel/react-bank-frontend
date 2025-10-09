# ---------- base (shared) ----------
FROM node:20-bookworm-slim AS base
WORKDIR /app

ENV npm_config_fund=false \
    npm_config_audit=false \
    npm_config_foreground_scripts=true \
    NPM_CONFIG_LOGLEVEL=verbose \
    NODE_OPTIONS=--max-old-space-size=3072 \
    HUSKY=0

RUN apt-get update && apt-get install -y --no-install-recommends \
    git python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}
RUN if [ -n "$NPM_TOKEN" ]; then \
      printf "//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n" >> /root/.npmrc ; \
    fi

# ---------- build ----------
FROM base AS build

# 1) Copy only package files first (cache-friendly). This expects package-lock.json present in app/
COPY app/package*.json ./app/
# If package-lock.json is at app/package-lock.json it will be copied by the above glob
# If lockfile is at repo root adjust COPY accordingly:
# COPY package-lock.json ./   OR  COPY app/package-lock.json ./app/

# copy the shared submodule into the build context path you expect
COPY @bank-app-common/ ./@bank-app-common/

WORKDIR /app
# install (ensure you run npm ci in app folder)
RUN cd app && npm ci --no-audit --no-fund

# 2) Copy source files
COPY app/tsconfig*.json ./app/
COPY app/vite.config.* ./app/
COPY app/index.html ./app/
COPY app/src ./app/src
COPY app/public ./app/public

# 3) Build
WORKDIR /app/app
ENV CI=false
RUN node -v && npm -v && node -p "process.versions"

RUN npm run build

# ---------- runtime ----------
FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
