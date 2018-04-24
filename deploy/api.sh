#!/bin/sh

repo=$1
dest=$2
tag=$3

rm -rf ${dest} 2>/dev/null
git clone "${repo}" "${dest}"
cd ${dest}
cp /etc/${tag} ${dest}/.env
docker rm -f ${tag} 2>/dev/null
docker build . -t=${tag}
docker run -d -p 3000:3000 --name ${tag} ${tag}

