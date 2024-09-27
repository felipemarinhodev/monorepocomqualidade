import { NodePlopAPI } from 'plop';
import path from 'path';

const ROOT_MONOREPO = path.resolve("..", "..");

export default function(plop) {
  plop.setGenerator('basics', {
    description: 'This is a skeleton plopfile',
    prompts: [], // Criar perguntas para pessoas que estão rodando o script
    actions: [], // Executar ações em cima dessas perguntas
  });

  commonPackage(plop);
}

function commonPackage(plop: NodePlopAPI) {
  plop.setGenerator('common-package', {
    description: 'Create a new common package inside `./commons` folder',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: 'What is the package name?'
      }
    ], // Criar perguntas para pessoas que estão rodando o script
    actions: [
      {
        type: 'add',
        path: path.resolve(ROOT_MONOREPO, "commons", "{{ lowerCase packageName }}", "package.json"),
        templateFile: 'templates/common-package/package.json.hbs'
      }
    ], // Executar ações em cima dessas perguntas
  });
}