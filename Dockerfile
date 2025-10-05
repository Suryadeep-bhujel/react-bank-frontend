# ---------- base (shared) ----------
FROM node:20-bookworm-slim AS base
WORKDIR /app
# Ensure postinstall scripts run (esbuild, rollup, etc.)
ENV npm_config_ignore_scripts=false
# Avoid noisy prompts
ENV CI=true

# ---------- dev (hot reload) ----------
FROM base AS dev
# Copy manifests first for caching
COPY package*.json ./
# If your local package is referenced via "file:./@bank-app-common" or workspaces,
# it MUST be present before npm install:
COPY @bank-app-common ./@bank-app-common
COPY tsconfig*.json ./
COPY vite.config.* ./

# Clean install for reproducibility
RUN npm ci

# App sources
COPY index.html ./
COPY src ./src
COPY public ./public

# Helpful when native binaries act up
RUN npm rebuild esbuild && node -e "require('esbuild')"

CMD ["npm","run","dev","--","--host"]

# ---------- build (production build) ----------
FROM base AS build
COPY package*.json ./
COPY @bank-app-common ./@bank-app-common
COPY tsconfig*.json ./
COPY vite.config.* ./
RUN npm ci

COPY index.html ./
COPY src ./src
COPY public ./public

# Give node a bit more headroom during build
ENV NODE_OPTIONS=--max-old-space-size=2048

# Ensure esbuild binary is present in this layer
RUN npm rebuild esbuild && node -e "require('esbuild')"

RUN npm run build

# ---------- runtime (nginx) ----------
FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
