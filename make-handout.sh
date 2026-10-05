#!/usr/bin/env bash
set -e

tar -cvzf handout.tgz \
    chatppp/effectual/{core,reconciler,tests,utils}/{package.json,tsconfig.json,src} \
    chatppp/effectual/.yarn/{releases,plugins} \
    chatppp/effectual/{.prettierrc.cjs,.yarnrc.yml,babel.config.json,eslint.config.mjs,package.json,rollup.config.mjs,tsconfig.json,yarn.lock} \
    chatppp/chatppp/client/{package.json,tsconfig.json,src,rollup.config.mjs,index.html} \
    chatppp/chatppp/server/{package.json,tsconfig.json,src} \
    chatppp/chatppp/.yarn/plugins \
    chatppp/chatppp/{.yarnrc.yml,package.json,tsconfig.json,yarn.lock} \
    chatppp/README.md