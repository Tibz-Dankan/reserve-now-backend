FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install --only=prod

COPY . .

ENV NODE_ENV=production

RUN  npm run migrate

CMD ["npm", "start"]   