const Plano = require("./plano")
const errorHandler = require('../../common/errorHandler')

Plano.methods(["get", "post", "put", "delete"])
Plano.updateOptions({
  new: true,
  runValidators: true
})

Plano.after('post', errorHandler).after('put', errorHandler)

Plano.route("count", (req, res, next) => {
  Plano.count((error, value) => {
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

module.exports = Plano