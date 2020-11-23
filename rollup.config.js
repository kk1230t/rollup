// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import alias from '@rollup/plugin-alias';
const libraryName = 'UITEST'; // Change with your library's name

const banner = `/*!
 * ${pkg.name}
 * ${pkg.description}
 *
 * @version v${pkg.version}
 * @author ${pkg.author}
 * @homepage ${pkg.homepage}
 * @repository ${pkg.repository.url}
 * @license ${pkg.license}
 */`;

export default commandLineArgs => {
  const configs = [
    // UMD Development
    {
      input: 'src/js/index.js',
      output: [
        {
          banner,
          name: libraryName,
          file: pkg.browser,
          format: 'umd',
          sourcemap: true
        },
        {
          banner,
          name: libraryName,
          file: pkg.browserMin,
          format: 'iife',
          plugins: [terser()]
        }
      ],
      plugins: [
        // Uncomment the following 2 lines if your library has external dependencies
        // resolve(), // teach Rollup how to find external modules
        // commonjs(), // so Rollup can convert external modules to an ES module
        alias({
          entries: [
            { find: 'uikit-util', replacement: './src/js/util/index.js' },
          ]
        }),
        // alias({
        //   entries: {
        //     utils: './src/js/util/index.js',
        //     'uikit-util': 'util'
        //   }
        // }),
        babel({
          exclude: ['node_modules/**']
        })
      ]
    }

    // CommonJS (for Node) and ES module (for bundlers) build
    // {
    //   input: 'src/js/index.js',
    //   external: [], // indicate which modules should be treated as external
    //   output: [
    //     {
    //       banner,
    //       file: pkg.main,
    //       format: 'cjs'
    //     },
    //     {
    //       banner,
    //       file: pkg.module,
    //       format: 'es'
    //     }
    //   ],
    //   plugins: [
    //     babel({
    //       exclude: ['node_modules/**']
    //     })
    //   ]
    // }
  ];

  // if (commandLineArgs.environment === 'BUILD:production') {
  //   // UMD Production
  //   configs.push({
  //     input: 'src/js/index.js',
  //     output: {
  //       banner,
  //       name: libraryName,
  //       file: `dist/${libraryName}.umd.min.js`,
  //       format: 'umd'
  //     },
  //     plugins: [
  //       // Uncomment the following 2 lines if your library has external dependencies
  //       // resolve(), // teach Rollup how to find external modules
  //       // commonjs(), // so Rollup can convert external modules to an ES module
  //       babel({
  //         exclude: ['node_modules/**']
  //       }),
  //       terser({
  //         output: {
  //           comments: /^!/
  //         }
  //       })
  //     ]
  //   });
  // }

  return configs;
};
