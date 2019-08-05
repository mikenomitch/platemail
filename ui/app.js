const express = require("express");
const path = require("path");
const fs = require("fs");

const envHash = require("./config/envVars");
const app = express();

const handleIndex = (req, res, route = nil) => {
  const buildDir = route ? `build/${route}` : "build";
  const indexPath = path.join(__dirname, buildDir, "index.html");
  const envString = JSON.stringify(envHash);

  const indexFile = fs.readFileSync(indexPath, "utf8");
  const withEnv = indexFile.replace("__PROD_BUILD_RUNTIME_VARS__", envString);

  res.send(withEnv);
};

app.get("/", function(req, res) {
  return handleIndex(req, res);
});

app.get("/:route", function(req, res) {
  try {
    return handleIndex(req, res, req.params.route);
  } catch (err) {
    return handleIndex(req, res);
  }
});

app.use(express.static(path.join(__dirname, "build")));

app.listen(4000);
