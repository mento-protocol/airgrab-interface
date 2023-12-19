const path = require("path");

// Taken from https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{mjs,js,jsx,tx,tsx,md}": ["prettier --write", buildEslintCommand],
};
