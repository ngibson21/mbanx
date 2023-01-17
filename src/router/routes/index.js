import publicRoutes from '@/router/routes/public.js'
import privateRoutes from '@/router/routes/private.js'
// should come from the backend, right?
// should be handled central without having to
// import it everywhere
import enabled from '@/config/enabled.js'

const defaultRoutes = publicRoutes.concat(privateRoutes)

const routes = (enabled, defaultRoutes) => {
  if (!enabled) return defaultRoutes
  return defaultRoutes
    .filter(route => {
      return enabled.includes(route.name)
    })
}

export default routes(enabled, defaultRoutes)
