const { BadRequest } = require('http-errors')

const { Transaction, User } = require('../../models')
const transactionList = require('./transactionList')
const moment = require('moment')

const addTransaction = async (body, owner) => {
  try {
    const { type, category, amount, date, comment } = body;
  //  moment(date).format();
  //   console.log("date", date)
  //   const transactionDate = moment(date).format();
    // console.log("transactionDate", transactionDate)
    // const transactionDate = new Date(date)
    // console.log("transactionDate", transactionDate)
    // const datex = new Date(transactionDate);
    // console.log("datex", datex)
    // const transactionDate = new Date(date.slice(0,10))
    // const previousTransactions = await Transaction.find({ owner, date: { $lt: transactionDate } }).sort('date')
    // const nextTransactions = await Transaction.find({ owner, date: { $gte: transactionDate } }).sort('date')
    const transactionDate = new Date(date.slice(0,10))
    const previousTransactions = await Transaction.find({ owner, date: { $lt: transactionDate } }).sort('date')
    const nextTransactions = await Transaction.find({ owner, date: { $gte: transactionDate } }).sort('date')
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
    const newTransaction = new Transaction({ type, category, amount, date: transactionDate, comment,balance, owner })
    await newTransaction.save()
    
    const updatedTransactionsList = await transactionList(owner)
    await User.findOneAndUpdate({ _id: owner }, { balance: updatedTransactionsList[0].balance  }, { new: true })
    return newTransaction
  } catch (error) {
    throw error
  };
}

module.exports = addTransaction