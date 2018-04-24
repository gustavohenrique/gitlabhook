#!/bin/sh

repo=$1
dest=$2
tag=$3

rm -rf ${dest} 2>/dev/null
git clone "${repo}" "${dest}"
cd ${dest}
docker build . -t=${tag}
docker run -d --name ${tag} --link fortfydb -e DATABASE_URL=postgres://admin:password@fortfydb:5432/fortfy?sslmode=disable ${tag}

