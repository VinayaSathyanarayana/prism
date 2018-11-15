import axios from 'axios';
const { execFile } = require('child_process');

describe('serve', () => {
  let serve: any;

  beforeAll(() => {
    serve = execFile('node', ['./packages/cli/bin/run', 'serve']);

    return new Promise((resolve, reject) => {
      serve.stdout.on('data', (message: string) => {
        console.log(`stdout: ${message}`);
        resolve();
      });

      serve.stderr.on('data', (message: string) => {
        console.log(`stderr: ${message}`);
        reject();
      });
    });
  });

  it('testName', async () => {
    const response = await axios({
      url: 'http://localhost:4010/',
    });

    console.log(response);

    expect(true).toBe(true);
  });

  afterAll(() => {
    serve.unref();

    serve.kill();

    return new Promise(resolve => serve.on('exit', resolve));
  });
});
