import axios from 'axios'
import Consts from '../../my_common/consts'

export function getCount() {
  const request = axios.get(`${Consts.API_URL}/clientes/count`)
  return {
    type: 'TOTAL_CLIENTES',
    payload: request,
  }
}
