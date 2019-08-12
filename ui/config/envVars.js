// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

const rawEnv = Object.keys(process.env)
  .filter(key => REACT_APP.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    {
      NODE_ENV: process.env.NODE_ENV || "development",
      API_HOST: process.env.HOST || "0.0.0.0",
      API_PORT: process.env.API_PORT || "3000",
      UI_DSN: process.env.UI_DSN,
      TEST: "hello"
    }
  );

module.exports = rawEnv;
