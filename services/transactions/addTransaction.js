const { BadRequest } = require('http-errors')

const { Transaction, User } = require('../../models')
const transactionList = require('./transactionList')

const addTransaction = async (body, owner) => {
  try {
    const { type, category, amount, date, comment } = body;
    const transactions = await transactionList(owner);
    let orderNumber = 0;
    let balance = 0;
    
    if (transactions.length===0) {
      orderNumber = 1;
      if (type === "income") {
        balance = amount;
      } else {
        throw new BadRequest("Balance cannot be negative ")
      }
    } else {
      const lastTransactionBalance = transactions[transactions.length - 1].balance;
      const lastTransactionOrderNumber = transactions[transactions.length - 1].orderNumber;

      orderNumber = lastTransactionOrderNumber + 1;
      if (type === "income") {
        balance = lastTransactionBalance + amount       
      } else {
        if (amount <= lastTransactionBalance) {
          balance = lastTransactionBalance - amount
        } else {
          throw new BadRequest("Balance cannot be negative ")
        }
      };
    };
    const newTransaction= new Transaction({orderNumber, type, category, amount, date, comment,balance, owner })
    await newTransaction.save()

    await User.findOneAndUpdate({ _id: owner }, { balance }, { new: true })

    return newTransaction
  } catch (error) {
    throw error
  };
}

module.exports = addTransaction
