import React from 'react'
import { NavigationOptions } from 'router5'
import { actions } from 'redux-router5'
import { connect, ConnectedProps } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { selectPokemon } from '../store/actions'

const mapStateToProps = (state: any) => ({
  route: state.router.route,
  selectedPokemon: state.app.selectedPokemon,
  params: state.router.route.params,
  existError: state.app.existPokemonError
})
const mapDispatchToProps = (dispatch: any) => ({
  navigateTo: (
    name: string,
    params?: { [key: string]: any },
    opts: NavigationOptions = {}
  ) => {
    dispatch(actions.navigateTo(name, params, opts))
  },
  selectPokemon: (name: string) => { dispatch(selectPokemon(name)) }

})
const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

function Pokemon ({
  selectedPokemon,
  params,
  existError,
  selectPokemon,
  navigateTo
}: PropsFromRedux) {
  const [loadImage, setLoadImage] = React.useState<any>(null)

  React.useEffect(() => {
    if (!selectedPokemon || selectedPokemon.name !== params.name) {
      selectPokemon(params.name)
    }
  }, [params])
  React.useEffect(() => {
    if (selectedPokemon && selectedPokemon.name === params.name && !loadImage) {
      const img = new Image()

      img.onload = () => {
        setLoadImage(img)
      }
      img.src = selectedPokemon.sprites.other['official-artwork'].front_default
    }
  }, [selectedPokemon])

  if (existError) {
    return <div>Error</div>
  }

  if (!selectedPokemon || !loadImage) {
    return (
      <div className='spinner-wrapper'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      <Button
        variant='contained'
        onClick={() => { window.history.back() }}
        startIcon={<ArrowBackIosIcon />}
      >
        Back
      </Button>
      <Paper className='poke-board'>
        <Grid container direction='column' spacing={2}>
          <Grid container alignItems='center' spacing={2} item>
            <Grid item sm={3}><img className='poke-image' src={loadImage.src} alt='' /></Grid>
            <Grid item sm={8}>
              <h2>{selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)} <span className='color-secondary'>№{selectedPokemon.id}</span></h2>
            </Grid>
          </Grid>
          <Grid item>
            <Paper className='poke-info'>
              <Grid container direction='row' spacing={2}>
                <Grid container item direction='column' justify='center' spacing={1} sm={6}>
                  <Grid item><span>Base experience: {selectedPokemon.base_experience}</span></Grid>
                  <Grid item><span>Height: {selectedPokemon.height}</span></Grid>
                  <Grid item><span>Weight: {selectedPokemon.weight}</span></Grid>
                  <Grid item><span>{selectedPokemon.types.length > 1 ? 'Types:' : 'Type:'} {selectedPokemon.types.map((t: { slot: number, type: { name: string, url: string }}) => t.type.name).join(', ')}</span></Grid>
                </Grid>
                <Grid container item direction='column' justify='center' sm={6}>
                  {selectedPokemon.stats.map((s: { base_stat: number, effort: number, stat: {name:string, url:string}}) => (
                    <div key={`stat-${s.stat.name}`} className='poke-stats'>
                      <span>{s.stat.name}: {s.base_stat}</span>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className='poke-info'>
              <Grid item container direction='column' spacing={1}>
                <Grid item>Abilities:</Grid>
                <ul>
                  {selectedPokemon.abilities.map((a: { slot: number, is_hidden: boolean, ability: { name: string, url: string }}) => (
                    <li key={`ability-${a.slot}`}>
                      <Grid item>
                        <Link
                          href='#'
                          onClick={(e: any) => {
                            e.preventDefault()
                            navigateTo('ability', { name: a.ability.name })
                          }}
                        >
                          {a.ability.name}
                        </Link>
                      </Grid>
                    </li>
                  ))}
                </ul>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default connector(Pokemon)
