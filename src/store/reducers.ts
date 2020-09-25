import {
  InitialState,
  ActionTypes,
  UPDATE_POKEMONS_LIST,
  SELECT_POKEMON,
  SET_POKEMON_ERROR,
  TRANSITION_SUCCESS,
  SELECT_AIBILITY,
  SET_AIBILITY_ERROR
} from './types'

const initialState: InitialState = {
  pokemons: [],
  selectedPokemon: null,
  existPokemonError: false,
  selectedAbility: null,
  existAbilityError: false,
  count: 0
}

export default (
  state = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
  case TRANSITION_SUCCESS:
    window.scrollTo(0, 0)

    return state
  case UPDATE_POKEMONS_LIST:
    return {
      ...state,
      count: action.payload.count,
      pokemons: [
        ...state.pokemons,
        ...action.payload.pokemons
      ]
    }
  case SELECT_POKEMON:
    return {
      ...state,
      selectedPokemon: action.payload
    }
  case SET_POKEMON_ERROR:
    return {
      ...state,
      existPokemonError: action.payload
    }
  case SELECT_AIBILITY:
    return {
      ...state,
      selectedAbility: action.payload
    }
  case SET_AIBILITY_ERROR:
    return {
      ...state,
      existAbilityError: action.payload
    }
  default:
    return state
  }
}
