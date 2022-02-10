# DEVELOPMENT
FROM node:16-alpine3.15 as development

WORKDIR /usr/src/auth

COPY package.json ./
COPY package-lock.json ./

RUN npm i -f

COPY . .

RUN npm run build

# PRODUCTION
FROM node:16-alpine3.15 AS production

# Set node env to prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/auth

COPY --from=development / /usr/src/auth

# EXPOSING PORT FOR OUTER WORLD
EXPOSE 8040

CMD [ "node", "dist/main" ]
