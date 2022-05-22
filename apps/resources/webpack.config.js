const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const buildPath = path.resolve(__dirname, '../../dist');

const alias = {
	'@shared': path.resolve(__dirname, '../common'),
	'@typings': path.resolve(__dirname, '../typings'),
};

const clientAlias = {
	'@utils': path.resolve(__dirname, './client/utils'),
	'@animation': path.resolve(__dirname, './client/animations'),
};

const serverAlias = {
	'@apps': path.resolve(__dirname, './server/apps'),
	'@lib': path.resolve(__dirname, './server/lib'),
	'@utils': path.resolve(__dirname, './server/utils'),
	'@entity': path.resolve(__dirname, './server/entity'),
	'@common': path.resolve(__dirname, './server/common'),
};

const server = () => {
	const plugins = [
		new CleanWebpackPlugin({
			buildPath: buildPath,
			dangerouslyAllowCleanPatternsOutsideProject: true,
			dry: true,
			cleanOnceBeforeBuildPatterns: [`${buildPath}/**/*`],
		}),
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
			minimize: false,
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
			clean: true,
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
			new CleanWebpackPlugin({
				cleanOnceBeforeBuildPatterns: [`${buildPath}/**/*`],
				buildPath: buildPath,
				dangerouslyAllowCleanPatternsOutsideProject: true,
				dry: true,
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
			clean: true,
		},
	};
};

module.exports = [server, client];
