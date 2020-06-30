const restful = require('node-restful')
const mongoose = restful.mongoose

const servidorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
})

module.exports = restful.model('Servidor', servidorSchema)
