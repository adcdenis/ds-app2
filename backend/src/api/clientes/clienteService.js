const Cliente = require('./cliente')
const errorHandler = require('../../common/errorHandler')

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

Cliente.route('getPopulate', (req, res, next) => {
  Cliente.find()
    .populate('servidor')
    .populate('plano')
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
