import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: {
      file: `dist/${pkg.name}.js`,
      exports: 'named',
      format: 'cjs',
      indent: false,
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [],
  },

  // ES
  {
    input: 'src/index.js',
    output: {
      file: `dist/es/${pkg.name}.js`,
      format: 'es',
      indent: false,
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [],
  },

  // ES for Browsers
  {
    input: 'src/index.js',
    output: {
      file: `dist/es/${pkg.name}.mjs`,
      format: 'es',
      indent: false,
    },
    plugins: [
      nodeResolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },

  // UMD Development
  {
    input: 'src/index.js',
    output: {
      file: `dist/umd/${pkg.name}.js`,
      format: 'umd',
      exports: 'named',
      name: `${pkg.libName}`,
      indent: false,
    },
    plugins: [
      nodeResolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  },

  // UMD Production
  {
    input: 'src/index.js',
    output: {
      file: `dist/umd/${pkg.name}.min.js`,
      format: 'umd',
      exports: 'named',
      name: `${pkg.libName}`,
      indent: false,
    },
    plugins: [
      nodeResolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
];
