import axios from 'axios'
import Consts from '../../src/consts'

export function getCount() {
  const request = axios.get(`${Consts.API_URL}/clientes/count`)
  return {
    type: 'TOTAL_CLIENTES',
    payload: request,
  }
}
