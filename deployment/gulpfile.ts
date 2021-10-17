import * as fs from "fs";

const {series} = require('gulp');
const exec = require('child_process').exec;
const argv = require('minimist')(process.argv.slice(2));

const local: boolean = argv.local || false;

const config = {
	sourcesDir: '../../src',
	serverlessDir: './',
	region: 'us-east-1'
};

const serverless = {
	deploy: async (cmd: string): Promise<string> =>
	{
		return new Promise<string>((resolve, reject) =>
		{
			let buffer = '';
			const spawn = exec(
				`set SLS_DEBUG=* && cd ${config.serverlessDir} && sls ${cmd} --verbose --stage default`,
				(err: any) =>
				{
					err ? reject(err) : resolve(buffer);
				}
			);
			spawn.stdout.pipe(process.stdout);
			spawn.stderr.pipe(process.stderr);
			spawn.stdout.on('data', (readData: any) =>
			{
				buffer += readData;
			});
		});
	},
};

const setup = {

	setup: async () =>
	{
		console.info('[setup] update');
		await serverless.deploy(`deploy --force`);
	}
};

const deploy = {
	print: async () =>
	{
		console.info('[website] print');
		await serverless.deploy(`print`);
	},

	package: async () =>
	{
		console.info('[website] package');
		await serverless.deploy(`package`);
	},

	remove_build_folder: async () =>
	{
		const folder = `../build`;
		console.info('[website] remove_build_folder ' + folder);
		if (fs.existsSync(folder)) fs.rmdirSync(folder, {recursive: true});

		console.info('✅ old build folder removed');
	},

	build_app: async () =>
	{
		console.info('[website] package');
		await new Promise<void>((resolve, reject) =>
		{
			const spawn = exec(
				`cd .. & npm run build`,
				(err: any) =>
				{
					err ? reject(err) : resolve();
				}
			);
			spawn.stdout.pipe(process.stdout);
			spawn.stderr.pipe(process.stderr);
		});
	},

	upload: async () =>
	{
		console.info('[website] upload');
		await serverless.deploy(`s3sync --force`);
	}
};

exports.deploy_print = deploy.print;
exports.deploy_build = deploy.build_app;
exports.setup = setup.setup;

exports.deploy_package = deploy.package;
exports.deploy = series(
	deploy.remove_build_folder,
	deploy.build_app,
	deploy.upload
);
