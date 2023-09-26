FROM node:18-alpine

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i

RUN npm install pm2 -g

# ENV PM2_PUBLIC_KEY

# ENV PM2_SECRET_KEY

COPY . .

RUN npm run build

CMD ["npm", "start"]