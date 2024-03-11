FROM node:18

WORKDIR /backend

COPY package*.json .
COPY ./prisma .

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 8787

CMD ["npm","run","dev"]