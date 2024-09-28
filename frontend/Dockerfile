FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG VITE_API_BASE_URL

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]