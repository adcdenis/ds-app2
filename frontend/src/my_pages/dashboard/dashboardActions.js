import axios from "axios";
import Consts from "../../my_common/consts";

export function getCount() {
  return (dispatch, getState) => {
    const userName = getState().auth.user.isAdmin
      ? ""
      : `&userName=${getState().auth.user.userName}`;

    const request = axios.get(
      `${Consts.API_URL}/clientes/clientesbyfilters?count=true${userName}`,
    );
    dispatch({
      type: "TOTAL_CLIENTES",
      payload: request,
    });
  };
}

export function getCountServidores() {
  return (dispatch, getState) => {
    const userName = getState().auth.user.isAdmin
      ? ""
      : `?userName=${getState().auth.user.userName}`;

    const request = axios.get(`${Consts.API_URL}/servidores/count${userName}`);
    dispatch({
      type: "TOTAL_SERVIDORES",
      payload: request,
    });
  };
}

export function getCountPlanos() {
  return (dispatch, getState) => {
    const userName = getState().auth.user.isAdmin
      ? ""
      : `?userName=${getState().auth.user.userName}`;

    const request = axios.get(`${Consts.API_URL}/planos/count${userName}`);
    dispatch({
      type: "TOTAL_PLANOS",
      payload: request,
    });
  };
}

export function getCountAVencer(days) {
  return (dispatch, getState) => {
    const userName = getState().auth.user.isAdmin
      ? ""
      : `&userName=${getState().auth.user.userName}`;

    const request = axios.get(
      `${Consts.API_URL}/clientes/clientesbyfilters?days=${days}&count=true${userName}`,
    );
    dispatch({
      type: "TOTAL_A_VENCER",
      payload: request,
    });
  };
}

export function getCountVencidos(days) {
  return (dispatch, getState) => {
    const userName = getState().auth.user.isAdmin
      ? ""
      : `&userName=${getState().auth.user.userName}`;

    const request = axios.get(
      `${Consts.API_URL}/clientes/clientesbyfilters?days=-1&count=true${userName}`,
    );
    dispatch({
      type: "TOTAL_VENCIDOS",
      payload: request,
    });
  };
}
