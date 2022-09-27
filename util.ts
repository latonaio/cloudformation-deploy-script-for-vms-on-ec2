import { exec } from "child_process";
import { stat, readFile } from "fs/promises";
import * as JSON5 from "json5";

export const deploy = async (
  params,
  argv,
) => {
  // ダブルクォートで formatParams は括らないと複数のパラメーターを認識できない
  const formatParams = Object.keys(params).reduce((collection, key) => {
    collection = `${collection === '' ? '' : `${collection} `}${key}=${params[key]}`;
    return collection;
  }, '');

  const command = `make deploy-cloudformation \\
      params="${formatParams}" \\
      targetStackTemplatePath="${argv.stackTemplatePath}/${argv.targetStackTemplate}.yaml" \\
      stackName="${params.StackName}" \\
      region="${argv.region}" \\
      profile="${argv.profile}"
    `;

  console.log(`command: ${command}`);
  await execAsync(`${command}`);
};

const execAsync = (command: string) => {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        stdout,
        stderr,
      });
    });
  });
};

export const readJsonFile = async (
  target: string,
  isJson5: boolean = true,
  parametersPath: string
) => {
  const filePath = `${parametersPath}/${target}.json${isJson5 ? '5' : ''}`;
  // 対象のファイルが存在しない場合は空のオブジェクトを返す
  try {
    const test = await stat(filePath);
  } catch (e) {
    console.log(`file doesn't exist in path`);
    return {};
  }

  return JSON5.parse(await readFile(filePath, 'utf8'));
};

