const restful = require('node-restful')
const mongoose = restful.mongoose

const planoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  valor: { type: Number, min: 0, required: true }
})

module.exports = restful.model('Plano', planoSchema)
