FROM node:20-alpine

WORKDIR /app

ENV VITE_API_BASE_URL=http://localhost:7860

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]