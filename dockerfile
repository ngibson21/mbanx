FROM ghcr.io/mbanq/nodelts-alpine as builder

WORKDIR /app
ENV APP_ENV="dev"
ENV CLIENT="MBANQ"
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

COPY . /app

RUN npm install --prodution
RUN npm rebuild

RUN MODE=${APP_ENV} npm run build
RUN bash -e scripts/pipelines/build-assets.sh

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
