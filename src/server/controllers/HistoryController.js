import History from '../database/models/History';

export const HistoryGet = (req, res) => {
  History.findAll({
    order: [['updatedAt', 'DESC']],
    limit: 10,
  })
  .then(data => {
    res.send(data);
  });
};

export const HistoryPost = (req, res) => {
  History.upsert({
    zipcode: req.body.zipcode,
    city: req.body.city,
  })
  .then((data) => {
    res.send(data);
  })
  .catch(err => {
    res.status(err.status || 500).send(err);
  });
};
