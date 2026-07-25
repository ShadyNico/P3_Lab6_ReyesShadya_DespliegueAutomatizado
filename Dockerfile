FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build
RUN mkdir -p node_modules/.vite-temp && chown -R node:node node_modules/.vite-temp

EXPOSE 4173

USER node

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
