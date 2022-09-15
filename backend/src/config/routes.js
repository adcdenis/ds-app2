const express = require('express')
const auth = require('./auth')
module.exports = function (server) {
  /*
   * Rotas protegidas por Token JWT
   */
  const protectedApi = express.Router()

  protectedApi.use(auth)

  //API ABERTA
  const openApi = express.Router()
  server.use('/api', openApi)

  //CLIENTE
  const Cliente = require('../api/clientes/clienteService')
  Cliente.register(openApi, '/clientes')

  //SERVIDOR
  const Servidor = require('../api/servidores/servidorService')
  Servidor.register(openApi, '/servidores')

  //PLANOS
  const Plano = require('../api/planos/planoService')
  Plano.register(openApi, '/planos')

  /*
   * Rotas abertas
   */
 
  server.use('/oapi', openApi)
  const AuthService = require('../api/user/authService')
  openApi.post('/login', AuthService.login)
  openApi.post('/signup', AuthService.signup)
  openApi.post('/validateToken', AuthService.validateToken)
}
