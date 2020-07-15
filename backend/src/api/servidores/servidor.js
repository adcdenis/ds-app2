const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema

const servidorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  userName: { type: String, required: false }
})

module.exports = restful.model('Servidor', servidorSchema)
