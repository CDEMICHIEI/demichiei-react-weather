import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import moment from 'moment';
import sequelize from '../src/server/database/config';

async function seed() {
  function loadFiles(file) {
    return new Promise(resolve => {
      const dataSet = [];
      console.log(`Fetching data from ${file}`);
      fs.createReadStream(path.join(__dirname, `/seeds/${file}`))
        .pipe(csv())
        .on('data', data => {
          dataSet.push(data);
        })
        .on('end', () => {
          resolve(dataSet);
          console.log(`data from ${file} fetched`);
        });
    });
  }

  function createModel(data, schema) {
    // define id
    let defineModel = `  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,\n  },\n\n`;
    // generate model attributes from files
    Object.keys(data[0]).forEach(key => {
      let type = '';
      const value = data[0][key];
      if (!isNaN(value)) {
        type = 'DataType.DECIMAL';
      } else if (moment(value, ['MM/DD/YYYY', 'M/DD/YYYY', 'MM/D/YYYY', 'M/D/YYYY'], true).isValid()) {
        type = 'DataType.DATE';
      } else {
        type = 'DataType.STRING';
      }
      defineModel += `  ${key}: {\n    type: ${type},\n  },\n\n`;
    });
    // define create and update time
    defineModel += `  createdAt: {
    allowNull: false,
    type: DataType.DATE,\n  },\n\n`;
    defineModel += `  updatedAt: {
    allowNull: false,
    type: DataType.DATE,\n  },\n\n`;
    const model =
`import DataType from 'sequelize';
import Model from '../config';\n
const ${schema} = Model.define('${schema}', {\n${defineModel}});
export default ${schema};\n`;
    console.log(`${schema} model created`);
    return model;
  }

  function createTable(data, schema, model) {
    return new Promise(resolve => {
      const modelPath = path.join(__dirname, `../src/server/database/models/${schema}.js`);
      fs.writeFile(modelPath, model, err => {
        if (err) {
          console.log(`Failed to create Model ${schema}`);
        } else {
          console.log(`${schema} table created`);
          const models = require(modelPath).default; // eslint-disable-line global-require
          resolve({
            models,
            schema,
            data,
          });
        }
      });
    });
  }

  function seedMain(index, files, result) {
    const file = files[index];
    if (file !== undefined && path.extname(file) === '.csv') {
      loadFiles(file).then((data) => {
        const schemaName = file.split('.')[0];
        const model = createModel(data, schemaName);
        createTable(data, schemaName, model).then((callback) => {
          if (index < files.length) {
            result.push(callback);
            seedMain(index + 1, files, result);
          }
        });
      });
    } else if (index < files.length) {
      seedMain(index + 1, files, result);
    } else {
      sequelize.sync({ force: true }).then(() => {
        result.forEach(callback => {
          callback.models.bulkCreate(callback.data).then(() => {
            console.log(`${callback.schema} data injected `);
          });
        });
      });
    }
  }

  const result = [];
  const files = fs.readdirSync(path.resolve(__dirname, 'seeds'));
  await seedMain(0, files, result);
}

export default seed;
