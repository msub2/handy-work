import resolve from "@rollup/plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import analyze from 'rollup-plugin-analyzer';
import alias from '@rollup/plugin-alias';
import del from 'rollup-plugin-delete'
import comlink from "@surma/rollup-plugin-comlink";
import omt from "@surma/rollup-plugin-off-main-thread";

export default {
	input: "src/handy-work.js",
	preserveEntrySignatures: 'false',
	output: {
		dir: "build/",
		format: "esm",
		sourcemap: true,
		manualChunks: {
			'shared': ['three/src/Three.js', 'comlink', './src/normalize.js']
		},
		chunkFileNames: '[name]-[hash].js'
	},
	plugins: [
		del({
			targets: 'build/*'
		}),
		alias({
			entries: [
				{ find: /^three$/, replacement: 'three/src/Three.js' }
			]
		}),
		comlink({
			useModuleWorker: true
		}), omt(),
		resolve(),
		commonjs({
			include: ["node_modules/**"],
		}),
		terser(),
		analyze(),
	]
};