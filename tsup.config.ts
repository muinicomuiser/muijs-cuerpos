import { defineConfig } from 'tsup'

export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./fuente/mui.ts'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true
})