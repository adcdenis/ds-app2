const Cliente = require('./cliente')
const errorHandler = require('../../common/errorHandler')
var moment = require('moment')

Cliente.methods(['get', 'post', 'put', 'delete'])
Cliente.updateOptions({
  new: true,
  runValidators: true,
})

Cliente.after('post', errorHandler).after('put', errorHandler)

Cliente.route('count', (req, res, next) => {
  Cliente.count((error, value) => {
    if (error) {
      res.status(500).json({
        errors: [error],
      })
    } else {
      res.json({
        value,
      })
    }
  })
})

Cliente.route('populate', (req, res, next) => {
  let data = new Date()
  data.setUTCHours(0)
  data.setMinutes(0)
  data.setSeconds(0)
  data.setMilliseconds(0)
  data.setDate(data.getDate() - req.query.days)
  //console.log(data)
  //console.log(req.query.days)
  const days = req.query.days ? { vencimento: { $gte: data } } : {}
  //console.log(days)
  Cliente.find(days)
    .populate('servidor')
    .populate('plano')
    .sort({ vencimento: -1 })
    .exec((error, result) => {
      if (error) {
        res.status(500).json({ errors: [error] })
      } else {
        res.json({
          result,
        })
      }
    })
})

Cliente.route('count_vencer', (req, res, next) => {
  const add = req.query.days ? req.query.days : 0

  var dataAtual = moment().format('YYYY-MM-DD[T00:00:00.000Z]')
  var dataFutura = moment().add(add,'days').format('YYYY-MM-DD[T00:23:59.999Z]')

  //teste
  var today = moment().startOf('day');
  // "2018-12-05T00:00:00.00
  var tomorrow = moment(today).endOf('day');
  // ("2018-12-05T23:59:59.999

  if (req.query.days) {
    console.log(dataAtual)
    console.log(dataFutura)

    Cliente.find({
      vencimento: { $gte: new Date(dataAtual), $lte: new Date(dataFutura) }
    })
      .populate('servidor')
      .populate('plano')
      .sort({ vencimento: -1 })
      .countDocuments()
      .exec((error, value) => {
        if (error) {
          res.status(500).json({ errors: [error] })
        } else {
          res.json({
            value,
          })
        }
      })
  } else {
    console.log(dataAtual)
    Cliente.find({ vencimento: { $lt: dataAtual } })
      .populate('servidor')
      .populate('plano')
      .sort({ vencimento: -1 })
      .countDocuments()
      .exec((error, value) => {
        if (error) {
          res.status(500).json({ errors: [error] })
        } else {
          res.json({
            value,
          })
        }
      })
  }
})

/*Cliente.route('summary', (req, res, next) => {
  Cliente.aggregate([{
      $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}} 
  }, {
      $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
  }, {
      $project: {_id: 0, credit: 1, debt: 1}
  }]).exec((error, result) => {
      if(error) {
          res.status(500).json({errors: [error]})
      } else {
          res.json(result[0] || {credit: 0, debt: 0})
      }
  })
})*/

module.exports = Cliente
