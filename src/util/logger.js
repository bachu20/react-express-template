const path = require("path");

module.exports = (filepath = "unknown") => {
  const filename = path.basename(filepath);

  return require("pino")({
    name: "code-connect",
    timestamp: false
  }).child({ filename });
};
