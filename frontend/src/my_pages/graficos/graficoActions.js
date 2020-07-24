import axios from "axios";
import Consts from "../../my_common/consts";

export function getTotalClienteServidor() {
  return (dispatch, getState) => {
    const userName = getState().auth.user.isAdmin
      ? ""
      : `userName=${getState().auth.user.userName}`;

    const request = axios.get(
      `${Consts.API_URL}/clientes/totalClienteServidor?${userName}`,
    );
    dispatch({
      type: "TOTAL_CLIENTES_SERVIDOR",
      payload: request,
    });
  };
}