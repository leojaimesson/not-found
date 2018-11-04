const pkgJson = require('./package.json');
const env = require('./dist/config/Environment').default;

module.exports = {
  apps: [{
    name: pkgJson.name,
    script: pkgJson.prodMain,
    instances: env.pm2.instances,
    autorestart: JSON.parse(env.pm2.autorestar),
    max_memory_restart: env.pm2.maxMemoryRestart,
  }],
};
