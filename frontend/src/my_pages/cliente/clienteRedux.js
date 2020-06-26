const INITIAL_STATE = {
  list: [],
  action: 'LISTAR'
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LISTAR_CLIENTES':
      return {
        ...state,
        list: action.payload.data,
      }
    case 'HABILITAR_FORM_CLIENTE':
      return {
        ...state,
        action: action.payload,
      }
    default:
      return state
  }
}
