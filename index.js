const config = {
  dev: false,
  // buildDir: 'nuxt',
  build: {
    publicPath: '/public/'
  }
}
const nuxt = new nuxt(config)

function handleRequest (req, res) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  nuxt.renderRoute('/')
  .then( (result) => {
    res.send(result.html)
  })
  .catch( (e) => {
    res.send(e)
  })
}

// app.get('*', handleRequest)

// exports.ssrapp = functions.https.onRequest(app)