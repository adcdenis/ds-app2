const INITIAL_STATE = {
  list: [],
  action: 'LISTAR',
  tipoTela:0
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LISTAR_CLIENTES':
      return {
        ...state,
        list: action.payload.data.value,
      }
    case 'HABILITAR_FORM_CLIENTE':
      return {
        ...state,
        action: action.payload,
      }
      case 'TROCAR_TELA':
        return {
          ...state,
          tipoTela: action.payload,
        }
    default:
      return state
  }
}
