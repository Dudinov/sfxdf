export interface Pokemon {
  name: string
  url: string
}
export interface PokemonInfo {
  abilities: any[]
  base_experience: number
  forms: any[]
  game_indices: any[]
  height: number
  held_items: []
  id: number
  is_default: true
  location_area_encounters: string
  moves: any[]
  name: string
  order: number
  species: any
  sprites: any
  stats: any[]
  types: any[]
  weight: number
}
export interface AbilityInfo {
  effect_changes: any[]
  effect_entries: any[]
  flavor_text_entries: any[]
  generation: {name: string, url: string}
  id: number
  is_main_series: boolean
  name: string
  names: any[]
  pokemon: any[]
}
export interface InitialState {
  selectedPokemon: PokemonInfo | null
  selectedAbility: AbilityInfo | null
  pokemons: Pokemon[]
  existPokemonError: boolean
  existAbilityError: boolean
  count: number
}

export const UPDATE_POKEMONS_LIST = 'UPDATE_POKEMONS_LIST'
export const SELECT_POKEMON = 'SELECT_POKEMON'
export const SET_POKEMON_ERROR = 'SET_POKEMON_ERROR'
export const SELECT_AIBILITY = 'SELECT_AIBILITY'
export const SET_AIBILITY_ERROR = 'SET_AIBILITY_ERROR'
export const TRANSITION_SUCCESS = '@@router5/TRANSITION_SUCCESS'

interface updatePokemonsAction {
  type : typeof UPDATE_POKEMONS_LIST
  payload: { pokemons: Pokemon[], count: number }
}
interface selectPokemonAction {
  type : typeof SELECT_POKEMON
  payload: PokemonInfo | null
}
interface setPokemonErrorAction {
  type : typeof SET_POKEMON_ERROR
  payload: boolean
}
interface selectAbilityAction {
  type : typeof SELECT_AIBILITY
  payload: AbilityInfo | null
}
interface setAbilityErrorAction {
  type : typeof SET_AIBILITY_ERROR
  payload: boolean
}
interface transitionSuccesAction {
  type : typeof TRANSITION_SUCCESS
  payload: any
}

export type ActionTypes = updatePokemonsAction | selectPokemonAction | selectAbilityAction | setAbilityErrorAction | setPokemonErrorAction | transitionSuccesAction
