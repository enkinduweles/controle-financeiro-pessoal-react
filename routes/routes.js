const express = require('express');
const transactionRouter = express.Router();
const transactions = require('../services/transactionService.js');

const findPeriod = transactions.findAll;
const findRegister = transactions.findOne;
const createRegister = transactions.create;
const updateRegister = transactions.updateOne;
const deleteRegister = transactions.deleteOne;

transactionRouter.post('/insert', createRegister);
transactionRouter.get('/', findPeriod);
transactionRouter.get('/search', findRegister);
transactionRouter.put('/update', updateRegister);
transactionRouter.delete('/delete', deleteRegister);

module.exports = transactionRouter;
