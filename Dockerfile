FROM node:20

WORKDIR /app

COPY package.json package-lock.json* ./
COPY /prisma prisma

RUN npm install

COPY . .

EXPOSE 12121
CMD ["npm", "run", "dev"]