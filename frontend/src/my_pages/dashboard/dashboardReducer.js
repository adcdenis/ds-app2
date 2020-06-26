const INITIAL_STATE = {
    totalClientes: {
        value: 0
    }
}
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'TOTAL_CLIENTES':
            return {
                ...state, totalClientes: action.payload.data
            }
            default:
                return state
    }
}