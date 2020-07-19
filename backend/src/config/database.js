const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."

mongoose.Error.messages.Number.min =
  "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max =
  "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum =
  "'{VALUE}' não é válido para o atributo '{PATH}'."

//const urlHeroku = 'mongodb://dstv:dstv78@ds053794.mlab.com:53794/heroku_6lb871t5'

const urlLocal = 'mongodb+srv://dsapp:dsappadmin@cluster0-sywji.mongodb.net/dsapp?retryWrites=true&w=majority'

//const urlLocal =  'mongodb://localhost/dsapp'
const url = process.env.MONGODB_ATLAS ? process.env.MONGODB_ATLAS : urlLocal

module.exports = mongoose.connect(url, { useNewUrlParser: true })
