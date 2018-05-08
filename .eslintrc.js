module.exports = {
  extends: ["eslint:recommended", "plugin:node/recommended"],
  plugins: ["node"],
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 8
  },
  rules: {
    "arrow-parens": [2, "as-needed"],
    "no-console": 0,
    "no-process-exit": 0
  }
}
