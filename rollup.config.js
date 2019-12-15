import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

import { libName, dependencies, peerDependencies } from './package.json';

const fileName = libName.toLowerCase();

export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: {
      file: `lib/${fileName}.js`,
      exports: 'named',
      format: 'cjs',
      indent: false,
    },
    external: [
      ...Object.keys(dependencies || {}),
      ...Object.keys(peerDependencies || {}),
    ],
    plugins: [],
  },

  // ES
  {
    input: 'src/index.js',
    output: {
      file: `lib/es/${fileName}.js`,
      format: 'es',
      indent: false,
    },
    external: [
      ...Object.keys(dependencies || {}),
      ...Object.keys(peerDependencies || {}),
    ],
    plugins: [],
  },

  // ES for Browsers
  {
    input: 'src/index.js',
    output: {
      file: `lib/es/${fileName}.mjs`,
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
      file: `lib/umd/${fileName}.js`,
      format: 'umd',
      exports: 'named',
      name: `${libName}`,
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
      file: `lib/umd/${fileName}.min.js`,
      format: 'umd',
      exports: 'named',
      name: `${libName}`,
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
