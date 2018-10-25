const pkgJson = require('./package.json');
import env from './src/config/Environment';

module.exports = {
  apps : [{
    name: pkgJson.name,
    script: pkgJson.prodMain,
    instances: env.pm2.instances,
    autorestart: env.pm2.autorestar,
    max_memory_restart: env.pm2.maxMemoryRestart
  }]
};
