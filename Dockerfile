# Use Node.js as temporary build image
FROM node:alpine as build

# Install rust
ENV RUSTUP_HOME=/usr/local/rustup \
    CARGO_HOME=/usr/local/cargo \
    PATH=/usr/local/cargo/bin:$PATH

RUN set -eux; \
    url="https://static.rust-lang.org/rustup/archive/1.22.1/x86_64-unknown-linux-musl/rustup-init"; \
    wget "$url"; \
    echo "cee31c6f72b953c6293fd5d40142c7d61aa85db2a5ea81b3519fe1b492148dc9 *rustup-init" | sha256sum -c -; \
    chmod +x rustup-init; \
    ./rustup-init -y --no-modify-path --profile minimal --default-toolchain nightly --default-host x86_64-unknown-linux-musl; \
    rm rustup-init; \
    chmod -R a+w $RUSTUP_HOME $CARGO_HOME; \
    rustup --version; \
    cargo --version; \
    rustc --version;

# Create working directory
RUN mkdir -p /srv/app
WORKDIR /srv/app

# Copy package.json and yarn.lock to force Docker not to use the cache
COPY package.json /srv/app
COPY yarn.lock /srv/app

# Install app dependencies
RUN yarn install

# Copy necessary app source
COPY public /srv/app/public
COPY src /srv/app/src
COPY tsconfig.json /srv/app
COPY tslint.json /srv/app

# Build app
RUN yarn run build

# Use nginx on Alpine Linux as base image
FROM nginx:stable-alpine

# Copy app from temporary build image to the final image
COPY --from=build /srv/app/dist /var/www

# Copy nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf

# Open port
EXPOSE 80

# Disable nginx daemonization
CMD ["nginx", "-g", "daemon off;"]
