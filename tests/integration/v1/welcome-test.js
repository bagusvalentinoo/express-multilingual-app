import supertest from 'supertest'

import app from '../../../src/app.js'

describe('GET /api/v1', () => {
  it('should return a welcome message', async () => {
    const response = await supertest(app).get('/api/v1')

    expect(response.status).toBe(200)
    expect(response.body.errors).toBe(null)
  })
})
