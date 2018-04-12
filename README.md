> Run Docker containers after webhook notification

## Why?

I'm using a machine with 512 MB as staging environment for my microservice. It is so weak to run a private Docker registry or a Kubernetes server. I have no time to spend thinking about the best way to deploy my API, so I created a webhook that's create a Docker image and recreate a container of my app.

## Install

### Dependencies

```
apt-get install supervisor docker git
```

### NodeJS

```
wget https://nodejs.org/dist/v8.11.1/node-v8.11.1-linux-x64.tar.xz
tar Jxf node-*
mv node-* /opt/node
ln -snf /opt/node/bin/npm /usr/local/bin
ln -snf /opt/node/bin/node /usr/local/bin
```

### Clone this repo

```
git clone <this-repo-url> /opt/gitlabhook
cd /opt/gitlabhook
npm install
```

### Execute using Supervisor

```
cat > /etc/supervisor/conf.d/gitlabhook.conf <<EOF
[program:gitlabhook]
command = caddy -conf /etc/Caddyfile 
EOF
supervisorctl reload
```

## License

MIT

