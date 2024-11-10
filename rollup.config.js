const resolve = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const typescript = require("@rollup/plugin-typescript")
const babel = require("@rollup/plugin-babel")
const postcss = require("rollup-plugin-postcss")
const path = require("path")
const json = require("@rollup/plugin-json")
const { terser } = require("rollup-plugin-terser")
const peerDepsExternal = require("rollup-plugin-peer-deps-external")

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(), // Externalize peer dependencies like React
    terser(),
    json(),
    postcss({
      extract: true, // Extracts CSS into a separate file in the build
      minimize: true,
      use: {
        sass: {
          includePaths: [path.resolve(__dirname, "node_modules")],
        },
      },
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    babel({
      presets: ["@babel/preset-react", "@babel/preset-env"],
      babelHelpers: "bundled",
    }),
  ],
  external: ["react", "react-dom", "styled-components"],
}
