import {
  SELECT_POKEMON,
  UPDATE_POKEMONS_LIST,
  SET_POKEMON_ERROR,
  SELECT_AIBILITY,
  SET_AIBILITY_ERROR
} from './types'

export const getPokemons = (offset: number = 0) => async (dispatch: any) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`, { method: 'GET' })
  const { results, count } = await response.json()

  dispatch({ type: UPDATE_POKEMONS_LIST, payload: { pokemons: results, count } })
}

export const selectPokemon = (pokemon: string) => async (dispatch: any, getState: () => any) => {
  if (getState().app.existPokemonError) {
    dispatch({ type: SET_POKEMON_ERROR, payload: false })
  }
  dispatch({ type: SELECT_POKEMON, payload: null })

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, { method: 'GET' })

  if (response.ok) {
    const selectedPokemon = await response.json()

    dispatch({ type: SELECT_POKEMON, payload: selectedPokemon })
  } else {
    dispatch({ type: SET_POKEMON_ERROR, payload: true })
  }
}
export const selectAbility = (ability: string) => async (dispatch: any, getState: () => any) => {
  if (getState().app.existAbilityError) {
    dispatch({ type: SET_AIBILITY_ERROR, payload: false })
  }
  dispatch({ type: SELECT_AIBILITY, payload: null })

  const response = await fetch(`https://pokeapi.co/api/v2/ability/${ability}`, { method: 'GET' })

  if (response.ok) {
    const selectedAbility = await response.json()

    dispatch({ type: SELECT_AIBILITY, payload: selectedAbility })
  } else {
    dispatch({ type: SET_AIBILITY_ERROR, payload: true })
  }
}
