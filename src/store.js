import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false, // Se agregó el estado para controlar el despliegue
  theme: 'light',
  personalActivo: [], // Se agregó el estado para el personal activo
}

const changeState = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'set':
      return { ...state, ...payload }
    case 'addPersonalActivo': // Nueva acción para agregar personal activo
      return {
        ...state,
        personalActivo: [...state.personalActivo, payload],
      }
    default:
      return state
  }
}

const Store = createStore(changeState)
export default Store
