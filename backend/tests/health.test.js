const test = require('node:test')
const assert = require('node:assert/strict')
const app = require('../app')

test('GET /health informa que la API está disponible', async () => {
  const server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))

  try {
    const { port } = server.address()
    const response = await fetch(`http://127.0.0.1:${port}/health`)
    const body = await response.json()

    assert.equal(response.status, 200)
    assert.equal(body.estado, 'ok')
    assert.equal(body.servicio, 'portal-pwa-backend')
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()))
    })
  }
})
