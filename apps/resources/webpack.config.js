const webpack = require('webpack');
const path = require('path');
const RemovePlugin = require('remove-files-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const buildPath = path.resolve(__dirname, '../../dist');

const alias = {
	'@shared': path.resolve(__dirname, '../shared'),
	'@typings': path.resolve(__dirname, '../typings'),
};

const clientAlias = {};

const serverAlias = {
	'@apps': path.resolve(__dirname, './server/apps'),
	'@lib': path.resolve(__dirname, './server/lib'),
	'@utils': path.resolve(__dirname, './server/utils'),
    '@entity': path.resolve(__dirname, './server/entity'),
    '@common': path.resolve(__dirname, './server/common'),
};

const server = () => {
	const plugins = [
		new RemovePlugin({
			before: {
				allowRootAndOutside: true,
				include: [path.resolve(buildPath, 'server')],
			},
			watch: {
				allowRootAndOutside: true,
				include: [path.resolve(buildPath, 'server')],
			},
		}),
		// Ignore cardinal as its optional
		// new webpack.IgnorePlugin(/^cardinal$/, /./),
	];

	return {
		entry: './server/server.ts',
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: ['babel-loader'],
					exclude: /node_modules/,
				},
			],
		},
		plugins,
		devtool: 'source-map',
		optimization: {
			minimize: true,
		},
		resolve: {
			modules: [path.resolve(__dirname, 'server'), 'node_modules'],
			preferRelative: true,
			extensions: ['.tsx', '.ts', '.js'],
			alias: {
				...alias,
				...serverAlias,
			},
		},
		output: {
			filename: '[contenthash].server.js',
			path: path.resolve(buildPath, 'server'),
		},
		target: 'node',
		externals: [nodeExternals()],
	};
};

const client = () => {
	return {
		entry: './client/client.ts',
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: ['babel-loader'],
					exclude: /node_modules/,
				},
			],
		},
		plugins: [
			new RemovePlugin({
				before: {
					allowRootAndOutside: true,
					include: [path.resolve(buildPath, 'client')],
				},
				watch: {
					allowRootAndOutside: true,
					include: [path.resolve(buildPath, 'client')],
				},
			}),
		],
		optimization: {
			minimize: true,
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			alias: {
				...alias,
				...clientAlias,
			},
		},
		output: {
			filename: '[contenthash].client.js',
			path: path.resolve(buildPath, 'client'),
		},
	};
};

module.exports = [server, client];
