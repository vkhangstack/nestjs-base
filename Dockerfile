# Building layer
FROM node:16.20.0-alpine as development

ARG SERVICES_NAME
ARG PORT

ENV PORT $PORT
ENV SERVICES_NAME=$SERVICES_NAME

# Create app directory
RUN mkdir -p /srv/$SERVICES_NAME
WORKDIR /srv/$SERVICES_NAME

RUN echo /srv/$SERVICES_NAME

ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


# Optional NPM automation (auth) token build argument
# ARG NPM_TOKEN

# Optionally authenticate NPM registry
# RUN npm set //registry.npmjs.org/:_authToken ${NPM_TOKEN}


# Copy configuration files
COPY tsconfig*.json ./
COPY package*.json ./
# COPY .env ./

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

# Copy application sources (.ts, .tsx, js)
COPY src/ src/

# Build application (produces dist/ folder)
RUN npm run build:prod

# Runtime (production) layer
# FROM node:16.20.0 as production
FROM development AS production


# Optional NPM automation (auth) token build argument
# ARG NPM_TOKEN

# Optionally authenticate NPM registry
# RUN npm set //registry.npmjs.org/:_authToken ${NPM_TOKEN}

WORKDIR /srv/$SERVICES_NAME

# Copy dependencies files
COPY package*.json ./

# Install runtime dependecies (without dev/test dependecies)
RUN npm ci --omit=dev

# Copy production build
COPY --from=development /srv/$SERVICES_NAME/build/ ./build/

# Expose application port
EXPOSE ${PORT}

# Start application
CMD [ "npm","run","start:prod" ]