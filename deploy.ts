import * as yargs from 'yargs';
import {
  deploy,
  readJsonFile,
} from './util';

import type { CommonParams } from './paramsType';

const argv = yargs
  .option('environment', {
    alias: 'e',
    description: 'environment',
    demandOption: true,
    type: 'string',
  })
  .option('profile', {
    description: 'aws config profile',
    demandOption: true,
    type: 'string',
  })
  .option('region', {
    description: 'aws target region',
    demandOption: true,
    type: 'string',
  })
  .option('stackTemplatePath', {
    alias: 's',
    description: 'stack template directory path',
    demandOption: true,
    type: 'string',
  })
  .option('parameterTarget', {
    alias: 'p',
    description: 'parameters target json file name',
    demandOption: true,
    type: 'string',
  })
  .option('targetStackTemplate', {
    alias: 't',
    description: 'cloudformation template yaml file name',
    demandOption: true,
    type: 'string',
  })
  .help()
  .parseSync();

(async () => {
  try {
    if (!argv.targetStackTemplate) { throw new Error('it must be targetStackTemplate argument');}
    if (!argv.parameterTarget) { throw new Error('it must be parameterTarget argument') }

    const parametersPath = `${argv.stackTemplatePath}/parameters/${!argv.environment ? 'dev' : argv.environment}`;
    console.log(`Environment is ${!argv.environment ? 'dev' : argv.environment}`);

    // commonは共通のparameter
    const commonParams = (await readJsonFile(
      'common', true, parametersPath
    )) as CommonParams;

    // parameters ディレクトリの json ファイルデータ
    const targetStackTemplateParams = await readJsonFile(
      argv.parameterTarget,
      true,
      parametersPath
    );

    // 共通で使うパラメーターと対象のパラメーターをマージする
    await deploy(
      Object.assign(
        commonParams,
        targetStackTemplateParams,
      ),
      argv,
    );
    console.log(`success deploy targetStackTemplate ${argv.targetStackTemplate}`);
    console.log(`success deploy parameterTarget ${argv.parameterTarget}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
