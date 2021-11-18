const { Transaction } = require('../../models')

const transactionList = async (userId, month, year, category) => {
  try {
    if (month&&year) {
      // console.log(typeof month,  month)
      //   console.log(typeof year, year)
        const fromDate = `${year}-${month.length===1? `0${month}`: month}-01T00:00:00.000Z`;
        const toDate = `${month === '12'?Number(year) + 1:year}-${month === '12'? '01': String(Number(month) + 1).length===1? `0${Number(month) + 1}`: Number(month) + 1}-01T00:00:00.000Z`
        // console.log("fromDate", fromDate)
        // console.log("toDate", toDate)
      const transactionList = await Transaction.find({ owner: userId, date: { $gte: fromDate, $lt: toDate } })
      return transactionList;
    } else {
      const transactionList = await Transaction.find({ owner: userId }).sort('-date');
      return transactionList;
    }
  } catch (error) {
    throw error
  }
}

module.exports = transactionList
