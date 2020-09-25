import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'

export default () => {
  const routes = [
    { name: 'root', path: '/' },
    { name: 'pokemon', path: '/pokemon/:name' },
    { name: 'ability', path: '/ability/:name' }
  ]
  const router = createRouter(routes, {
    defaultRoute: 'root'
  }
  )

  router.usePlugin(
    browserPlugin({ useHash: true })
  )

  return router
}
