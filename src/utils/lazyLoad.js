// lazyLoads a view or a component
function lazyLoad (path) {
  return () => import(/* webpackChunkName: "[request]" */ '@/' + path + '.vue')
}

export default lazyLoad
