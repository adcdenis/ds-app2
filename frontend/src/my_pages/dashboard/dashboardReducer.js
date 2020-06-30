const INITIAL_STATE = {
  totalClientes: {
    value: 0,
  },
  totalServidores: {
    value: 0,
  },
  totalPlanos: {
    value: 0,
  },
};
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "TOTAL_CLIENTES":
      return {
        ...state,
        totalClientes: action.payload.data,
      };
    case "TOTAL_SERVIDORES":
      return {
        ...state,
        totalServidores: action.payload.data,
      };
    case "TOTAL_PLANOS":
      return {
        ...state,
        totalPlanos: action.payload.data,
      };
    default:
      return state;
  }
}
