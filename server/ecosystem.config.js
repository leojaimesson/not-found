const pkgJson = require('./package.json');

module.exports = {
  apps : [{
    name: pkgJson.name,
    script: pkgJson.prodMain,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
