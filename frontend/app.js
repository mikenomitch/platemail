const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const handleIndex = (req, res) => {
  const indexPath = path.join(__dirname, "build", "index.html");
  const envString = JSON.stringify({ API_PORT: "RUNTIME PORT" });

  const indexFile = fs.readFileSync(indexPath, "utf8");
  const withEnv = indexFile.replace("__PROD_BUILD_RUNTIME_VARS__", envString);

  res.send(withEnv);
};

app.get("/", function(req, res) {
  return handleIndex(req, res);
});

app.get("/:route", function(req, res) {
  return handleIndex(req, res);
});

app.use(express.static(path.join(__dirname, "build")));

app.listen(4000);
