FROM node

WORKDIR /Users/chanonhongthong/Deverloper/react-register

# Install PM2
COPY package.json .

COPY ecosystem.config.js .

COPY . .

RUN npm install

RUN npm install -g pm2

EXPOSE 5000

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]