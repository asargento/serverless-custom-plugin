import Serverless from 'serverless';
import { Logging } from 'serverless/classes/Plugin';
import { Http } from 'serverless/plugins/aws/provider/awsProvider';

interface HttpWithCustomProps extends Http {
  customProp1?: string[];
  customProp2?: string;
}

export class CustomPlugin {
  serverless: Serverless;
  options: any;
  log: any;
  stage: string;

  commands: any;
  hooks: { [key: string]: any };

  constructor(serverless: Serverless, options: any, { log }: Logging) {
    this.serverless = serverless;
    this.options = options;
    this.log = log;
    this.stage = serverless.service.provider.stage;
    this.serverless.configSchemaHandler.defineFunctionEventProperties(
      'aws',
      'http',
      {
        properties: {
          customProp1: { items: { type: 'string' }, type: 'array' },
          customProp2: { type: 'string' },
        },
      },
    );
    this.hooks = {
      'before:deploy:deploy': () => this.beforeDeploy(),
      initialize: () => this.init(),
    };
  }

  init() {
    const service = this.serverless.service;
    this.log.info('custom-plugin');
    this.log.info('Service: ', service.service);
    this.log.info('Provider name: ', service.provider.name);
  }

  async beforeDeploy() {
    const service = this.serverless.service;
    for (const [, lambdaFunction] of Object.entries(service.functions)) {
      for (const [, event] of Object.entries(lambdaFunction.events)) {
        const httpWithCustomProps = event.http as HttpWithCustomProps;
        if (
          httpWithCustomProps &&
          httpWithCustomProps.customProp1 &&
          httpWithCustomProps.customProp2
        ) {
          this.log.info(
            `Event: ${httpWithCustomProps.method} ${httpWithCustomProps.path}`,
            `customProp1: ${httpWithCustomProps.customProp1}`,
            `customProp2: ${httpWithCustomProps.customProp2}`,
          );

          // Do something with this information!
        }
      }
    }
  }
}

module.exports = CustomPlugin;
