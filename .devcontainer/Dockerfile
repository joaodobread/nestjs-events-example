FROM node:12.14.0-alpine3.11

RUN apk add --no-cache zsh zsh-vcs

RUN apk add --no-cache git

RUN apk add curl wget vim --update

ENV HOME=/home/node
ENV APP=${HOME}/app
ENV ZSH_CUSTOM=${HOME}/.oh-my-zsh

USER root

WORKDIR ${HOME}

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" && \
  git clone https://github.com/denysdovhan/spaceship-prompt.git "${ZSH_CUSTOM}/themes/spaceship-prompt" && \
  ln -s "${ZSH_CUSTOM}/themes/spaceship-prompt/spaceship.zsh-theme" "${ZSH_CUSTOM}/themes/spaceship.zsh-theme" && \
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/zdharma/zinit/master/doc/install.sh)"

COPY ./terminal/.zshrc ${HOME}/.zshrc

RUN npm config set cache /home/node/app/.npm-cache --global

RUN npm i -g @nestjs/cli

WORKDIR ${APP}