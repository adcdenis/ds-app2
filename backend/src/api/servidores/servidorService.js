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

module.exports = Servidor