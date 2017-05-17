import dev from './environments/development';
import prod from './environments/production';
import test from './environments/test';

const env = 'development';

const currentEnv = {
  envName: env || process.env.NODE_ENV,
};

switch (currentEnv.envName) {
  case 'development': Object.assign(currentEnv, dev); break;
  case 'production': Object.assign(currentEnv, prod); break;
  case 'test': Object.assign(currentEnv, test); break;
  default: Object.assign(currentEnv, dev); break;
}

export default currentEnv;
