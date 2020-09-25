import React from 'react'
import { NavigationOptions } from 'router5'
import { actions } from 'redux-router5'
import { connect, ConnectedProps } from 'react-redux'
import {
  Main,
  Pokemon,
  Ability
} from './pages'

const mapStateToProps = (state: any) => ({
  route: state.router.route
})
const mapDispatchToProps = (dispatch: any) => ({
  navigateTo: (
    name: string,
    params?: { [key: string]: any },
    opts: NavigationOptions = {}
  ) => {
    dispatch(actions.navigateTo(name, params, opts))
  }
})
const connector = connect(mapStateToProps, mapDispatchToProps)

interface Route {
  component: React.ReactNode
  routeName: string
}
type PropsFromRedux = ConnectedProps<typeof connector>

function App (props: PropsFromRedux) {
  const routes: Route[] = [
    { component: <Main />, routeName: 'root' },
    { component: <Pokemon />, routeName: 'pokemon' },
    { component: <Ability />, routeName: 'ability' }
  ]
  const renderComponent = routes.find((r: Route) => r.routeName === props.route.name)

  if (!renderComponent) {
    props.navigateTo('root')

    return null
  }

  return (
    <main>
      <h1>Sfxdx pokemons</h1>
      {renderComponent?.component}
    </main>
  )
}

export default connector(App)
