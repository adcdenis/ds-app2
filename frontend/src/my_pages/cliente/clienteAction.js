import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
//import { reset as resetForm, initialize } from 'redux-form'
import Consts from '../../my_common/consts'
import {formatarFromJsonAnoMesDia, formatarFromDate} from '../../my_common/DateUtil'
//import { toast } from 'react-toastify';

const INITIAL_VALUES = { vencimento: formatarFromDate(new Date()) }

export function getList() {
  const request = axios.get(`${Consts.API_URL}/clientes/populate`)
  return {
    type: 'LISTAR_CLIENTES',
    payload: request,
  }
}

export function create(values) {
  return invoker(values, 'post')
}

export function showCliente(cliente, funcao) {
  if (cliente) {
    //convert data
    cliente.vencimento = formatarFromJsonAnoMesDia(cliente.vencimento)
    return [
      initialize('ClienteForm', cliente),
      {
        type: 'HABILITAR_FORM_CLIENTE',
        payload: funcao,
      },
    ]
  } else {
    return [
      initialize('ClienteForm', INITIAL_VALUES),
      {
        type: 'HABILITAR_FORM_CLIENTE',
        payload: 'NOVO',
      },
    ]
  }
}

export function cancelar() {
  return [
    {
      type: 'HABILITAR_FORM_CLIENTE',
      payload: 'LISTAR',
    },
  ]
}

export function init() {
  return [
    initialize('ClienteForm', INITIAL_VALUES),
    getList(),
    {
      type: 'HABILITAR_FORM_CLIENTE',
      payload: 'LISTAR',
    },
  ]
}

export function update(values) {
  return invoker(values, 'put')
}

export function excluir(values) {
  return invoker(values, 'delete')
}

function invoker(values, method) {
  return (dispatch) => {
    const value_id = values._id ? values._id : ''
    axios[method](`${Consts.API_URL}/clientes/${value_id}`, values)
      .then((resp) => {
        toastr.success('Sucesso', 'Operação realizada com sucesso!')
        //toast('Sucesso')
        dispatch([init()])
      })
      .catch((e) => {
        e.response.data.errors.forEach((element) => {
          toastr.error('Erro', element)
        })
      })
    return {
      type: 'TEMP',
    }
  }
}
