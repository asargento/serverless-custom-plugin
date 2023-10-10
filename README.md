# Serverless Custom Plugin Example

Simple [serverless](https://www.serverless.com/) custom plugin example in [Typescript](https://www.typescriptlang.org/).

## Installation

Use the package manager [npm](https://www.npmjs.com) to install this module.

```bash
npm install && npm build
```

After that comment the folder `./dist` must be created with the plugin distribution.

## Usage

In the serveless project, it is necessary to configure the following files:

- package.json
```json
"devDependencies": {
    ...
    "serverless-custom-plugin": "file:../serverless-custom-plugin",
    ...
```

- serveless.yml
```ymal
plugins:
  ...
  - serverless-custom-plugin
  ...

functions:
  someLambdaFunction:
    ...
    events:
      - http:
        method: get
        path: some/path/resources
        ...
        customProp1:
            - value1
            - value2
            - value3
        customProp2: someValue
    ...
```

Running the the serverless deploy, we should get the following output:

```bash
Deploying service-programs-with-authorizer to stage dev (eu-west-1)

custom-plugin
Service:  'service-programs-with-authorizer'
Provider name:  'aws'
...
Event: get some/path/resources 'customProp1: value1,value2,value3' 'customProp2: someValue'
...
```
