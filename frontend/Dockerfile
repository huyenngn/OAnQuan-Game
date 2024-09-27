FROM node:lts-alpine AS build-frontend

ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_KEY
ARG VITE_BACKEND_NA
ARG VITE_BACKEND_EU
ARG VITE_BACKEND_AS

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_KEY=$VITE_SUPABASE_KEY
ENV VITE_BACKEND_NA=$VITE_BACKEND_NA
ENV VITE_BACKEND_EU=$VITE_BACKEND_EU
ENV VITE_BACKEND_AS=$VITE_BACKEND_AS

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-frontend /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
