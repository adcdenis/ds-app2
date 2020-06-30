import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import Consts from '../../my_common/consts'

const INITIAL_VALUES = { }

export function getList() {
  const request = axios.get(`${Consts.API_URL}/servidores`)
  return {
    type: 'LISTAR_SERVIDOR',
    payload: request,
  }
}

export function create(values) {
  return invoker(values, 'post')
}

export function show(values, funcao) {
  if (values) {
    return [
      initialize('ServidorForm', values),
      {
        type: 'HABILITAR_FORM_SERVIDOR',
        payload: funcao,
      },
    ]
  } else {
    return [
      initialize('ServidorForm', INITIAL_VALUES),
      {
        type: 'HABILITAR_FORM_SERVIDOR',
        payload: 'NOVO',
      },
    ]
  }
}

export function cancelar() {
  return [
    {
      type: 'HABILITAR_FORM_SERVIDOR',
      payload: 'LISTAR',
    },
  ]
}

export function init() {
  return [
    initialize('ServidorForm', INITIAL_VALUES),
    getList(),
    {
      type: 'HABILITAR_FORM_SERVIDOR',
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
    axios[method](`${Consts.API_URL}/servidores/${value_id}`, values)
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
