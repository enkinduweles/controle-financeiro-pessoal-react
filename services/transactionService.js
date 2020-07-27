const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const create = (req, res) => {
  const {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  } = req.body;

  const transaction = new TransactionModel({
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  });

  transaction
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(404).send({
        message: 'Não foi possível inserir registro.',
        infoSystem: error,
      });
    });
};

const findAll = (req, res) => {
  const period = req.query.period;
  const condition = { yearMonth: period };
  // console.log(ObjectId);

  if (!period) {
    return res.status(404).send({
      message:
        'É necessário informar o parâmetro /period/, cujo valor deve estar no formato yyyy-mm',
    });
  }

  TransactionModel.find(condition)
    .then((data) => {
      if (data.length < 1) {
        return res.status(400).send({
          message:
            'Não foi possível fazer a buscar, verifique se o período buscado está entre 2019/01 - 2021/12',
        });
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(400).send({
        message: 'Erro ao requisitar período, tente novamente!',
        messageSystem: error,
      });
    });
};

const updateOne = (req, res) => {
  const id = req.query.id;
  const dataBody = req.body;

  TransactionModel.findByIdAndUpdate({ _id: id }, dataBody, { new: true })
    .then((data) => {
      if (data.length < 1) {
        return res.status(400).send({
          message: `Não foi possível encontrar o id: ${id}`,
        });
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(400).send({
        message: 'Erro ao tentar atualizar registro, tente novamente!',
        messageSystem: error,
      });
    });
};

const deleteOne = (req, res) => {
  const id = req.query.id;

  TransactionModel.findByIdAndDelete({ _id: id })
    .then((data) => {
      if (data.length < 1) {
        return res.status(400).send({
          message: `Não foi possível encontrar o id: ${id}`,
        });
      }
      res.send({ message: 'Registro excluído com sucesso.' });
    })
    .catch((error) => {
      res.status(400).send({
        message: 'Erro ao tentar atualizar registro, tente novamente!',
        messageSystem: error,
      });
    });
};

const findOne = (req, res) => {
  const id = req.query.id;

  TransactionModel.findById({ _id: id })
    .then((data) => {
      if (data.length < 1) {
        return res.status(400).send({
          message: `Não foi possível encontrar o id: ${id}`,
        });
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(400).send({
        message: 'Erro ao buscar registro, tente novamente!',
        messageSystem: error,
      });
    });
};

module.exports = { findAll, create, updateOne, deleteOne, findOne };
