FROM mhart/alpine-node:16

WORKDIR /app

COPY package.json .

RUN npm install --only=prod

COPY . .

RUN  npm run migrate

CMD ["npm", "start"]   