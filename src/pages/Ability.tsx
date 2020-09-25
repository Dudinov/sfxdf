import React from 'react'
import { NavigationOptions } from 'router5'
import { actions } from 'redux-router5'
import { connect, ConnectedProps } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { selectAbility } from '../store/actions'

const mapStateToProps = (state: any) => ({
  route: state.router.route,
  params: state.router.route.params,
  selectedAbility: state.app.selectedAbility,
  existError: state.app.existAbilityError

})
const mapDispatchToProps = (dispatch: any) => ({
  navigateTo: (
    name: string,
    params?: { [key: string]: any },
    opts: NavigationOptions = {}
  ) => {
    dispatch(actions.navigateTo(name, params, opts))
  },
  selectAbility: (name: string) => { dispatch(selectAbility(name)) }

})
const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

function Ability ({
  params,
  selectedAbility,
  existError,
  selectAbility
}: PropsFromRedux) {
  React.useEffect(() => {
    if (!selectedAbility || selectedAbility.name !== params.name) {
      selectAbility(params.name)
    }
  }, [selectedAbility, params])
  if (existError) {
    return <div>Error</div>
  }
  if (!selectedAbility) {
    return null
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
          <Grid item>
            Ability: {selectedAbility.name}
          </Grid>
          <Grid item>
            <p>{selectedAbility.effect_entries.find((e: {effect: string, language: { name: string, url: string }, short_effect: string}) => e.language.name === 'en')?.effect}</p>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default connector(Ability)
