const Plano = require('./plano')
const errorHandler = require('../../common/errorHandler')

Plano.methods(['get', 'post', 'put', 'delete'])
Plano.updateOptions({
  new: true,
  runValidators: true,
})

Plano.after('post', errorHandler).after('put', errorHandler)

Plano.route('count', (req, res, next) => {
  Plano.count((error, value) => {
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

Plano.route('planosbyfilters', (req, res, next) => {
  const userName = req.query.userName ? req.query.userName : 0

  let filter = {}

  console.log(`Parâmetro userName no plano service: ${req.query.userName}`)

  //Filtro de usuário
  if (userName) filter.userName = { $eq: userName }

  console.log(filter)

  const isCount = req.query.count ? true : false

  let query = Plano.find(filter).sort({ nome: 1 })

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

module.exports = Plano
