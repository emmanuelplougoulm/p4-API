module.exports = {
  apps: [
    {
      script: "./server.js",
      watch: ".",
    },
  ],

  deploy: {
    production: {
      key: "/Users/e/.ssh/id_rsa.pub", // path to the public key to authenticate
      user: "debian",
      host: [{ host: "193.70.115.32", port: "1025" }],
      ref: "origin/main",
      repo: "https://github.com/emmanuelplougoulm/p4-API",
      path: "/home/debian/api.p4-collectif.com",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
