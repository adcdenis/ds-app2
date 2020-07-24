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
  Cliente.find()
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

/**
 * Se tiver o parametro days positivo, traz somente os que vão vencer a x dias
 * Se não tiver o parâmetro days, traz todos
 * Se o parâmetro for 0 traz somente a vencer
 * Se o parâmetro for negativo traz vencidos
 * Se tiver o parâmetro count só conta, se não tiver traz os registros conforme os filtros de day
 */
Cliente.route('clientesbyfilters', (req, res, next) => {
  const userName = req.query.userName ? req.query.userName : 0
  const add = req.query.days ? req.query.days : 0

  let dataAtual = moment().format('YYYY-MM-DD[T00:00:00.000Z]')
  let dataFutura = moment()
    .add(add, 'days')
    .format('YYYY-MM-DD[T00:23:59.999Z]')

  //teste
  //dataAtual = moment().startOf('day')
  // "2018-12-05T00:00:00.00
  //dataFutura = moment(dataAtual).endOf('day')
  // ("2018-12-05T23:59:59.999
  let filter = {}

  console.log(`Parâmetro days: ${req.query.days}`)
  console.log(`Parâmetro userName: ${req.query.userName}`)
  if (req.query.days !== undefined) {
    if (parseInt(req.query.days) === 0) {
      filter = { vencimento: { $gte: dataAtual } }
    }

    if (parseInt(req.query.days) > 0) {
      filter = {
        vencimento: {
          $gte: new Date(dataAtual),
          $lte: new Date(dataFutura),
        },
      }
    }

    if (parseInt(req.query.days) < 0) {
      filter = { vencimento: { $lt: dataAtual } }
    }
  }

  //Filtro de usuário
  if (userName) filter.userName = { $eq: userName }

  console.log(dataAtual)
  console.log(dataFutura)
  console.log(filter)

  const isCount = req.query.count ? true : false

  let query = Cliente.find(filter)
    .populate('servidor')
    .populate('plano')
    .sort({ vencimento: 1 })

  query = isCount ? query.count() : query

  query.exec((error, value) => {
    if (error) {
      console.log(error)
      res.status(500).json({ errors: [error] })
    } else {
      console.log(value)
      res.json({
        value,
      })
    }
  })
})

Cliente.route('totalClienteServidor', (req, res, next) => {

  const userName = req.query.userName ? req.query.userName : 0
  let dataAtual = moment().format('YYYY-MM-DD[T00:00:00.000Z]')
  let filter = { vencimento: { $gte: new Date(dataAtual) } }
  if(filter) {
    filter.userName = { $eq: userName }
  }
  console.log(filter)

  Cliente.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: { servidor: '$servidor' },
        count: { $sum: 1 },
        servidor: { $first: '$servidor' },
      },
    },
    {
      $lookup: {
        from: 'servidors',
        localField: 'servidor',
        foreignField: '_id',
        as: 'servidor',
      },
    },
    { $sort : { 'servidor.nome' : 1 } }
    //{ $unwind: '$servidor' }
  ]).exec((error, result) => {
    if (error) {
      res.status(500).json({ errors: [error] })
    } else {
      res.json(result)
    }
  })
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
