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
  totalAVencer: {
    value: 0,
  },
  totalVencidos: {
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
    case "TOTAL_A_VENCER":
      return {
        ...state,
        totalAVencer: action.payload.data,
      };
   case "TOTAL_VENCIDOS":
        return {
          ...state,
          totalVencidos: action.payload.data,
        };
    default:
      return state;
  }
}
