// Contents of the file /rollup.config.js
import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";
const config = [
    {
        input: 'build/index.js',
        output: {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
        },
        external: ['axios', 'os', 'url'],
        plugins: [typescript()]
    }, {
        input: 'build/index.d.ts',
        output: {
            file: 'dist/index.d.ts',
            format: 'es'
        },
        plugins: [dts()]
    }
];
export default config;