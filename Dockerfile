FROM node:24.4.1-alpine3.21

EXPOSE 7000

RUN \
  apk update && \
  apk add openssl

COPY . /application
WORKDIR /application

RUN \
  corepack enable && \
  corepack prepare pnpm@10.13.1 --activate

RUN \
  pnpm install --frozen-lockfile

ENTRYPOINT [ "/application/scripts/entrypoint.sh" ]
