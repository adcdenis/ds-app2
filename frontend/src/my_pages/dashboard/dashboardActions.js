import axios from 'axios'
import Consts from '../../my_common/consts'

export function getCount() {
  const request = axios.get(`${Consts.API_URL}/clientes/clientesbyfilters?count=true`)
  return {
    type: 'TOTAL_CLIENTES',
    payload: request,
  }
}

export function getCountServidores() {
  const request = axios.get(`${Consts.API_URL}/servidores/count`)
  return {
    type: 'TOTAL_SERVIDORES',
    payload: request,
  }
}

export function getCountPlanos() {
  const request = axios.get(`${Consts.API_URL}/planos/count`)
  return {
    type: 'TOTAL_PLANOS',
    payload: request,
  }
}

export function getCountAVencer(days) {
  const request = axios.get(`${Consts.API_URL}/clientes/clientesbyfilters?days=${days}&count=true`)
  return {
    type: 'TOTAL_A_VENCER',
    payload: request,
  }
}

export function getCountVencidos(days) {
  const request = axios.get(`${Consts.API_URL}/clientes/clientesbyfilters?days=0&count=true`)
  return {
    type: 'TOTAL_VENCIDOS',
    payload: request,
  }
}
