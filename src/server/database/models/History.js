import DataType from 'sequelize';
import Model from '../config';

const History = Model.define('history', {
  zipcode: {
    type: DataType.STRING,
    unique: true,
  },
  city: {
    type: DataType.STRING,
  },

}, {
  freezeTableName: true,
  timestamps: true,
});

// History.sync({ force: true });

export default History;
