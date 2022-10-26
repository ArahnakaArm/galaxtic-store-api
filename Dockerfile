FROM node:14.20-alpine
ENV TZ=Asia/Bangkok

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers 
RUN npm config set unsafe-perm true
RUN npm install --quiet node-gyp -g

RUN apk add tzdata \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && npm install \
    && mkdir -p /app/ssl

ARG CONTAINER_PORT
ARG PM2_FILE
ENV PM2_FILE ${PM2_FILE}

WORKDIR /app/

COPY . /app

RUN npm install -g pm2 && npm install express express-winston winston && npm install 

EXPOSE 8080

CMD pm2 start ${PM2_FILE} --no-daemon