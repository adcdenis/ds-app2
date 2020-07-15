const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema

const planoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  valor: { type: Number, min: 0, required: true },
  userName: { type: String, required: false }
})

module.exports = restful.model('Plano', planoSchema)
