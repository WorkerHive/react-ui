import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import commonjs from 'rollup-plugin-commonjs';
const extensions = [".js", ".jsx", ".ts", ".tsx"];
const input = "src/index.ts";


const plugins = [
  typescript({
    typescript: require("typescript"),
  }),
  commonjs({
    include: 'node_modules/**',
    // left-hand side can be an absolute path, a path
    // relative to the current directory, or the name
    // of a module in node_modules
    namedExports: {
      'node_modules/react/index.js': [
        'cloneElement',
        'createContext',
        'Component',
        'createElement'
      ],
      'node_modules/react-dom/index.js': ['render', 'hydrate'],
      'node_modules/react-is/index.js': [
        'isElement',
        'isValidElementType',
        'ForwardRef'
      ]
    }
  })
];

export default [
  {
    input,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    plugins,
  },
];

