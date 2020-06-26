const restful = require('node-restful')
const mongoose = restful.mongoose

/*const creditSchema = new mongoose.Schema({
 name: { type: String, required: true },
 value: { type: Number, min: 0, required: true }
})

const debtSchema = new mongoose.Schema({
 name: { type: String, required: true },
 value: { type: Number, min: 0, required: true },
 status: { type: String, required: false, uppercase: true,
 enum: ['PAGO', 'PENDENTE', 'AGENDADO'] }
})*/

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  usuario: { type: String, required: false },
  email: { type: String, required: false },
  vencimento: { type: Date, required: true },
  telefone: { type: Number, required: false },
  observacao: { type: String, required: false },
  id_plano: { type: Number, required: false },
  id_servidor: { type: Number, required: false }
})

module.exports = restful.model('Cliente', clienteSchema)
