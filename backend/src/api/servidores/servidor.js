const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema

const servidorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  user: {type: Schema.ObjectId, ref: 'User'}
})

module.exports = restful.model('Servidor', servidorSchema)
