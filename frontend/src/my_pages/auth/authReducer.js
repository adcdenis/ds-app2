const userKey = '_mymoney_user'
let userLogin = JSON.parse(localStorage.getItem(userKey))
userLogin = userLogin ? userLogin : {name: 'Antonio Denilson Canuto', email : 'adcdenis@gmail.com'}
const INITIAL_STATE = {
  user: userLogin,
  validToken: false,
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOKEN_VALIDATED':
      if (action.payload) {
        return { ...state, validToken: true }
      } else {
        localStorage.removeItem(userKey)
        return { ...state, validToken: false, user: null }
      }
    case 'USER_FETCHED':
      console.log('user autenticado, salvando na storage')
      localStorage.setItem(userKey, JSON.stringify(action.payload))
      console.log('salvou no storage: ' + localStorage.getItem(userKey))
      return { ...state, user: action.payload, validToken: true }
    default:
      return state
  }
}
