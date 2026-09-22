#!/usr/bin/env bash

yy=$(date +%y)
timestamp="${yy: -1}.$(date +"%m.%d.%H")"
sed -i.bak -e "s/version: '[0-9].[0-1][0-9].[0-3][0-9].[0-2][0-9]'/version: '$timestamp'/" ./src/config.js
sed -i.bak -e 's/"version": "[0-9].[0-1][0-9].[0-3][0-9].[0-2][0-9]"/"version": "'$timestamp'"/' ./package.json
rm ./src/config.js.bak
rm ./package.json.bak
