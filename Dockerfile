FROM node:14-slim
WORKDIR /opt/movie
COPY . .
RUN npm install
CMD ["npm", "start"]