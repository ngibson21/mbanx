/* eslint-disable camelcase */
const dynamicManifest = {
  name: 'Mbanq Banking',
  short_name: 'Mbanq',
  description: 'Mbanq Online Banking',
  icons: [
    {
      src: `${window.location.protocol}//${window.location.host}/img/icons/android-chrome-192x192.png`,
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: `${window.location.protocol}//${window.location.host}/img/icons/android-chrome-512x512.png`,
      sizes: '512x512',
      type: 'image/png'
    }
  ],
  // Todo: Take only tenantIdentifier from query, we could have something else in query that we don't want
  start_url: `${window.location.protocol}//${window.location.host}/index.html${window.location.search}`,
  display: 'standalone',
  orientation: 'portrait',
  background_color: '#fafafa',
  theme_color: '#fafafa'
}
const stringManifest = JSON.stringify(dynamicManifest)
const blob = new Blob([stringManifest], { type: 'application/javascript' })
const manifestURL = URL.createObjectURL(blob)
document.querySelector('#manifest').setAttribute('href', manifestURL)
