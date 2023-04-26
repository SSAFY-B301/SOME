FROM node:alpine as builder

WORKDIR /app

COPY ./package.json /app

RUN npm install

COPY . /app

CMD [ "npm","run","start" ]

# FROM nginx

# EXPOSE 3000

# COPY ./nginx/default.conf /etc/nginx/conf.d/next.conf

# COPY --from=builder /app/build /usr/share/nginx/html