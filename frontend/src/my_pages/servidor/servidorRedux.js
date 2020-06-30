const INITIAL_STATE = {
  list: [],
  action: 'LISTAR'
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LISTAR_SERVIDOR':
      return {
        ...state,
        list: action.payload.data,
      }
    case 'HABILITAR_FORM_SERVIDOR':
      return {
        ...state,
        action: action.payload,
      }
    default:
      return state
  }
}
