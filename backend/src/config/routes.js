const express = require('express')
const auth = require('./auth')
module.exports = function (server) {
  /*
   * Rotas protegidas por Token JWT
   */
  const protectedApi = express.Router()
  server.use('/api', protectedApi)
  //protectedApi.use(auth)
  const Cliente = require('../api/clientes/clienteService')
  Cliente.register(protectedApi, '/clientes')

  //SERVIDOR
  const Servidor = require('../api/servidores/servidorService')
  Servidor.register(protectedApi, '/servidores')

  //PLANOS
  const Plano = require('../api/planos/planoService')
  Plano.register(protectedApi, '/planos')

  /*
   * Rotas abertas
   */
  const openApi = express.Router()
  server.use('/oapi', openApi)
  const AuthService = require('../api/user/authService')
  openApi.post('/login', AuthService.login)
  openApi.post('/signup', AuthService.signup)
  openApi.post('/validateToken', AuthService.validateToken)
}
