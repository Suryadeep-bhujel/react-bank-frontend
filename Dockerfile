# ---------- base (shared) ----------
FROM node:20-bookworm-slim AS base
WORKDIR /app

# Make npm deterministic and noisy during CI
ENV npm_config_fund=false \
    npm_config_audit=false \
    npm_config_foreground_scripts=true \
    NPM_CONFIG_LOGLEVEL=verbose \
    NODE_OPTIONS=--max-old-space-size=3072 \
    HUSKY=0

# Build essentials for any native deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    git python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# For private registries (if you use one)
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}
# Create a minimal .npmrc if token is provided (adjust the registry if needed)
# Remove this block if you already COPY an .npmrc
RUN if [ -n "$NPM_TOKEN" ]; then \
      printf "//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n" >> /root/.npmrc ; \
    fi

# ---------- dev ----------
FROM base AS dev
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
# COPY @bank-app-common ./@bank-app-common
RUN npm ci
EXPOSE 5173
CMD ["npm","run","dev","--","--host","0.0.0.0"]

# ---------- build ----------
FROM base AS build
# 1) Install deps with only the files npm needs -> better cache
COPY package*.json ./
# COPY @bank-app-common/package*.json ./@bank-app-common/
RUN ls -la && test -f package-lock.json || (echo "package-lock.json missing" && exit 1)
RUN npm ci

# 2) Now bring source
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY @bank-app-common ./@bank-app-common
COPY index.html ./
COPY src ./src
COPY public ./public

# 3) CI nuances:
#    - Avoid CRA-style “warnings as errors” (Vite usually fine, but safe)
#    - Remove esbuild rebuild (Debian already gets the correct prebuilt)
ENV CI=false
# Show env & versions to aid debugging if it fails
RUN node -v && npm -v && node -p "process.versions" && env | sort

# 4) Build
RUN npm run build --verbose

# ---------- runtime ----------
FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
# If you have an nginx.conf, keep this; otherwise default is fine
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
