async function build() {
	const chalk = (await import('chalk')).default;

	const path = await import('path');

	const buildPath = path.resolve(__dirname, '../../dist');

	const { esbuildDecorators } = require('@anatine/esbuild-decorators');

	require('esbuild')
		.build({
			entryPoints: ['./client/client.ts'],
			bundle: true,
			outfile: buildPath + '/client/client.js',
			target: ['chrome58'],
			minify: false,
			format: 'iife',
		})
		.then(() => console.log(chalk.green('[client]: Built successfully!')))
		.catch(() => process.exit(1));

	require('esbuild')
		.build({
			entryPoints: ['./server/server.ts'],
			bundle: true,
			outfile: buildPath + './server/server.js',
			format: 'cjs',
			minify: false,
			platform: 'node',
			external: ['pg-hstore', 'typeorm'],
			plugins: [
				esbuildDecorators({ tsconfig: './server/tsconfig.json' }),
			],
		})
		.then(() => console.log(chalk.green('[server]: Built successfully!')))
		.catch(() => process.exit(1));
}

build();
