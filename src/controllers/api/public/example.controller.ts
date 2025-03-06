import type { Request, Response, NextFunction } from 'express'

import { t } from '@/lib/i18n/i18n'
import ExampleService from '@/services/example/example.service'
import type {
  CreateUpdateExampleRequest,
  DeleteBatchExampleRequest
} from '@/types/model/example.type'
import { responseSuccess } from '@/utils/response.util'

/**
 * Handles a GET request to /example
 * 
 * @param {Request} _req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns The Express response object.
 *
 * @example
 * ```typescript
 * app.get('/example', ExampleController.index)
 * ```
 */
const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const examples = await ExampleService.getExamples() // Get the examples

    // Send an example response
    responseSuccess(res, {
      statusCode: 200,
      message: t('get_data_success', { ns: 'resource', name: 'Examples' }),
      data: examples
    })
    return
  } catch (error) {
    // Pass the error to the next middleware
    next(error)
  }
}

/**
 * Handles a POST request to /example
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns The Express response object.
 *
 * @example
 * ```typescript
 * app.post('/example', ExampleController.store)
 * ```
 */
const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req.body as CreateUpdateExampleRequest // Get the request body
    const example = await ExampleService.createExample(request) // Create an example

    // Send a success response with the created example
    responseSuccess(res, {
      statusCode: 201,
      message: t('create_data_success', { ns: 'resource', name: 'Example' }),
      data: example
    })
    return
  } catch (error) {
    // Pass the error to the next middleware
    next(error)
  }
}

/**
 * Handles a GET request to /example/:id
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns The Express response object.
 *
 * @example
 * ```typescript
 * app.get('/example/:id', ExampleController.show)
 * ```
 */
const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const example = await ExampleService.getExampleById(req.params.id as string) // Get the example

    // Send a success response with the example
    responseSuccess(res, {
      statusCode: 200,
      message: t('get_data_success', { ns: 'resource', name: 'Example' }),
      data: example
    })
    return
  } catch (error) {
    // Pass the error to the next middleware
    next(error)
  }
}

/**
 * Handles a PUT request to /example/:id
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns The Express response object.
 *
 * @example
 * ```typescript
 * app.put('/example/:id', ExampleController.update)
 * ```
 */
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req.body as CreateUpdateExampleRequest // Get the request body
    const example =
      await ExampleService.updateExampleById(req.params.id as string, request) // Update the example

    // Send a success response with the updated example
    responseSuccess(res, {
      statusCode: 200,
      message: t('update_data_success', { ns: 'resource', name: 'Example' }),
      data: example
    })
    return
  } catch (error) {
    // Pass the error to the next middleware
    next(error)
  }
}

/**
 * Handles a DELETE request to /example/
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns The Express response object.
 *
 * @example
 * ```typescript
 * app.delete('/example/', ExampleController.destroyBatch)
 * ```
 */
const destroyBatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ExampleService.deleteExampleBatch(
      req.body as DeleteBatchExampleRequest
    ) // Delete the examples

    // Send a success response
    responseSuccess(res, {
      statusCode: 200,
      message: t('delete_data_success', { ns: 'resource', name: 'Examples' }),
      data: null
    })
    return
  } catch (error) {
    // Pass the error to the next middleware
    next(error)
  }
}

// Export the example controller
export default {
  index,
  store,
  show,
  update,
  destroyBatch
}
