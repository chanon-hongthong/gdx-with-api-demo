module.exports = {
    apps : [{
      name: "app",
      script: "./server.js",
      instances  : 3,
      exec_mode  : "cluster",
    }]
  }