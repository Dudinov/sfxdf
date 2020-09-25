import React from 'react'
import { NavigationOptions } from 'router5'
import { actions } from 'redux-router5'
import { connect, ConnectedProps } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import SearchIcon from '@material-ui/icons/Search'
import { Pokemon } from '../store/types'
import { getPokemons } from '../store/actions'

const mapStateToProps = (state: any) => ({
  route: state.router.route,
  pokemons: state.app.pokemons,
  pokemonsCount: state.app.count
})
const mapDispatchToProps = (dispatch: any) => ({
  navigateTo: (
    name: string,
    params?: { [key: string]: any },
    opts: NavigationOptions = {}
  ) => {
    dispatch(actions.navigateTo(name, params, opts))
  },
  getPokemons: (offset?: number) => { dispatch(getPokemons(offset)) }
})
const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

function Main ({
  pokemons,
  pokemonsCount,
  navigateTo,
  getPokemons
}: PropsFromRedux) {
  const [filter, setFilter] = React.useState('')

  React.useEffect(() => {
    if (!pokemons.length) {
      getPokemons()
    }
  }, [pokemons])

  if (!pokemons.length) {
    return null
  }

  return (
    <div>
      <Grid container className='' spacing={2}>
        <Grid
          item
          container
          direction='row'
          justify='center'
          alignItems='center'
          xs={12}
        >
          <Grid item>
            <TextField
              onChange={(ev) => setFilter(ev.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        {
          pokemons
            .filter((el: Pokemon) => el.name.toLowerCase().startsWith(filter.toLowerCase()))
            .map((el: Pokemon, i: number) => (
              <Grid key={i} item xs={12} sm={4} md={3}>
                <Paper
                  className='poke-card'
                  onClick={() => {
                    navigateTo('pokemon', { name: el.name })
                  }}
                  variant='outlined'
                >
                  {el.name}
                </Paper>
              </Grid>
            ))
        }
        {
          pokemons.length === pokemonsCount && (
            <Grid
              item
              container
              direction='row'
              justify='center'
              alignItems='center'
              xs={12}
            >
              <Grid item>
                <Button
                  variant='contained'
                  onClick={() => { getPokemons(pokemons.length) }}
                  startIcon={<ArrowDownwardIcon />}
                >
                  Show more
                </Button>
              </Grid>
            </Grid>
          )
        }
      </Grid>
    </div>
  )
}

export default connector(Main)
