const { BadRequest } = require('http-errors')

const { Transaction, User } = require('../../models')
const transactionList = require('./transactionList')

const addTransaction = async (body, owner) => {
  try {
    const { type, category, amount, date, comment } = body;

    const previousTransactions = await Transaction.find({ owner, date: { $lt: new Date(date) } }).sort('date')
    const nextTransactions = await Transaction.find({ owner, date: { $gte: new Date(date) } }).sort('date')
    let balance = 0;
    
    if (previousTransactions.length===0) {
      if (type === "income") {
        balance = amount;
        nextTransactions.forEach(async (tr) => {
          await Transaction.findOneAndUpdate({ _id: tr._id }, { balance: tr.balance + amount }, { new: true });
        });

      } else {
        throw new BadRequest("Balance cannot be negative ")
      }
    } else {
      const previousTransactionBalance = previousTransactions[previousTransactions.length - 1].balance;
      
      if (type === "income") {
        balance = previousTransactionBalance + amount;
        nextTransactions.forEach(async (tr) => {
          await Transaction.findOneAndUpdate({ _id: tr._id }, { balance: tr.balance + amount }, { new: true });
        });
      } else {
        if (amount <= previousTransactionBalance) {
          balance = previousTransactionBalance - amount;
          nextTransactions.forEach(async (tr) => {
            await Transaction.findOneAndUpdate({ _id: tr._id }, { balance: tr.balance - amount }, { new: true });
          })
        } else {
          throw new BadRequest("Balance cannot be negative ")
        }
      };
    };
    const newTransaction= new Transaction({type, category, amount, date, comment,balance, owner })
    await newTransaction.save()
    
    const updatedTransactionsList = await transactionList(owner)
    await User.findOneAndUpdate({ _id: owner }, { balance: updatedTransactionsList[0].balance  }, { new: true })
    return newTransaction
  } catch (error) {
    throw error
  };
}

module.exports = addTransaction