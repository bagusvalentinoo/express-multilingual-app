import { describe, it, expect, jest } from 'bun:test'
import type { Response } from 'express'

import {
  responseSuccess,
  responseError
} from '../../../src/utils/response.util'

const mockResponse = () => {
  const res = {} as Response
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)

  return res
}

describe('responseSuccess', () => {
  it('should send a successful response with status code, message, and data', () => {
    const res = mockResponse()
    const options = {
      statusCode: 200,
      message: 'Successfully fetched data',
      data: { id: 1, name: 'John' }
    }

    responseSuccess(res, options)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Successfully fetched data',
      data: { id: 1, name: 'John' }
    })
  })

  it('should handle missing data field gracefully', () => {
    const res = mockResponse()
    const options = {
      statusCode: 200,
      message: 'Success with no data'
    }

    responseSuccess(res, options)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Success with no data',
      data: null
    })
  })
})

describe('responseError', () => {
  it('should send an error response with status code, message, and no errors', () => {
    const res = mockResponse()
    const options = {
      statusCode: 400,
      message: 'Bad Request',
      errors: null
    }

    responseError(res, options)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Bad Request',
      errors: null
    })
  })

  it('should send an error response with status code, message, and validation errors', () => {
    const res = mockResponse()
    const options = {
      statusCode: 422,
      message: 'Entity validation failed',
      errors: [
        { field: 'name', message: 'Name is required' },
        { field: 'email', message: 'Email is required' }
      ]
    }

    responseError(res, options)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Entity validation failed',
      errors: [
        { field: 'name', message: 'Name is required' },
        { field: 'email', message: 'Email is required' }
      ]
    })
  })

  it('should handle missing errors field gracefully', () => {
    const res = mockResponse()
    const options = {
      statusCode: 500,
      message: 'Internal Server Error'
    }

    responseError(res, options)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Internal Server Error',
      errors: null
    })
  })
})
