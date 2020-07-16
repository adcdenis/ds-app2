import axios from "axios";
import { toastr } from "react-redux-toastr";
import { initialize } from "redux-form";
//import { reset as resetForm, initialize } from 'redux-form'
import Consts from "../../my_common/consts";
import {
  formatarFromJsonAnoMesDia,
  formatarFromDate,
} from "../../my_common/DateUtil";

//import { toast } from 'react-toastify';

const INITIAL_VALUES = { vencimento: formatarFromDate(new Date()) };

export function getList() {
  return (dispatch, getState) => {
    const tipoTela = getState().cliente.tipoTela;
    console.log(getState().auth.user.isAdmin);
    const userName = getState().auth.user.isAdmin
      ? ""
      : `&userName=${getState().auth.user.userName}`;

    let request = null;
    if (tipoTela === 1)
      //a vencer
      request = axios.get(
        `${Consts.API_URL}/clientes/clientesbyfilters?days=0${userName}`,
      );

    if (tipoTela === 2)
      // a vencer em 3 dias
      request = axios.get(
        `${Consts.API_URL}/clientes/clientesbyfilters?days=3${userName}`,
      );

    if (tipoTela === 3)
      // vencidos
      request = axios.get(
        `${Consts.API_URL}/clientes/clientesbyfilters?days=-1${userName}`,
      );

    dispatch({ type: "LISTAR_CLIENTES", payload: request });
  };
}

export function create(values) {
  return invoker(values, "post");
}

export function showCliente(cliente, funcao) {
  if (cliente) {
    //convert data
    cliente.vencimento = formatarFromJsonAnoMesDia(cliente.vencimento);
    return [
      initialize("ClienteForm", cliente),
      {
        type: "HABILITAR_FORM_CLIENTE",
        payload: funcao,
      },
    ];
  } else {
    return [
      initialize("ClienteForm", INITIAL_VALUES),
      {
        type: "HABILITAR_FORM_CLIENTE",
        payload: "NOVO",
      },
    ];
  }
}

export function cancelar() {
  return [
    {
      type: "HABILITAR_FORM_CLIENTE",
      payload: "LISTAR",
    },
  ];
}

export function init(nrPesq) {
  return [
    {
      type: "TROCAR_TELA",
      payload: nrPesq,
    },
    initialize("ClienteForm", INITIAL_VALUES),
    getList(),
    {
      type: "HABILITAR_FORM_CLIENTE",
      payload: "LISTAR",
    },
  ];
}

export function update(values) {
  return invoker(values, "put");
}

export function excluir(values) {
  return invoker(values, "delete");
}

function invoker(values, method) {
  return (dispatch, getState) => {

    if(method === 'post') {
      values.userName = getState().auth.user.userName
      console.log('values in post: ' + values)
    }
    const value_id = values._id ? values._id : "";
    console.log('values: ')
    console.log(values)
    axios[method](`${Consts.API_URL}/clientes/${value_id}`, values)
      .then(resp => {
        toastr.success("Sucesso", "Operação realizada com sucesso!");
        //toast('Sucesso')
        const tipoTela = getState().cliente.tipoTela;
        dispatch([init(tipoTela)]);
      })
      .catch(e => {
        console.log("Errors: " + e)
        e.response.data.errors.forEach(element => {
          toastr.error("Erro", element);
        });
      });
    return {
      type: "TEMP",
    };
  };
}

export function updateVencimento(values) {
  var date = new Date(values.vencimento);
  //date.setMinutes(date.getMinutes()-date.getTimezoneOffset())
  date.setDate(date.getDate() + 31);
  values.vencimento = JSON.stringify(date);
  values.vencimento = JSON.parse(values.vencimento);
  console.log(values);
  return invoker(values, "put");
}
