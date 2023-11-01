FROM node:16.13.0-alpine3.14

WORKDIR /app

COPY package*.json .

RUN npm i 

COPY . .

RUN npm run build
RUN npx prisma generate


EXPOSE 9000
CMD ["node", "dist/main"]
