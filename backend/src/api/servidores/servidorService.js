const Servidor = require("./servidor")
const errorHandler = require('../../common/errorHandler')

Servidor.methods(["get", "post", "put", "delete"])
Servidor.updateOptions({
  new: true,
  runValidators: true
})

Servidor.after('post', errorHandler).after('put', errorHandler)

Servidor.route("count", (req, res, next) => {
  Servidor.count((error, value) => {
    if (error) {
      res.status(500).json({
        errors: [error]
      })
    } else {
      res.json({
        value
      })
    }
  })
})

Servidor.route('servidoresbyfilters', (req, res, next) => {
  const userName = req.query.userName ? req.query.userName : 0

  let filter = {}

  console.log(`Parâmetro userName no plano service: ${req.query.userName}`)

  //Filtro de usuário
  if (userName) filter.userName = { $eq: userName }

  console.log(filter)

  const isCount = req.query.count ? true : false

  let query = Servidor.find(filter).sort({ nome: 1 })

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

module.exports = Servidor