FROM node:14.16.1

ENV TZ Asia/Manila

WORKDIR /app

COPY .devcontainer/fonts /root/.local/share/fonts

RUN apt-get upgrade && apt-get update \
    && apt-get install -y zsh dos2unix \
    && git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k \
    && npm i -g @adonisjs/cli

COPY .devcontainer/.zshrc /root/.zshrc
RUN dos2unix /root/.zshrc
COPY frontend/package*.json frontend/
COPY backend/package*.json backend/

RUN cd frontend && npm install
RUN cd backend && npm install

COPY .devcontainer .devcontainer
COPY frontend frontend
COPY backend backend
    
CMD ["sleep","infinity"]