import request from 'supertest'
import app from '../src/app'
import {
  MakeRequestOptions,
  GetSuccessDataResourceMessageOptions,
  Languages
} from './test-util.type'

export const makeRequest = async ({
  method,
  url,
  data,
  language = 'default',
  headers = {},
  query = {}
}: MakeRequestOptions) => {
  const req = request(app)[method](url)

  if (data) req.send(data)
  if (language && language !== 'default') req.set('Accept-Language', language)
  Object.entries(headers).forEach(([key, value]) => req.set(key, value))
  req.query(query)

  return req
}

export const getSuccessDataResourceMessage = ({
  type,
  key,
  language = 'default'
}: GetSuccessDataResourceMessageOptions) => {
  const lang = language === 'default' ? 'en' : language
  const messages = {
    get: {
      en: `Get ${key} data successfully`,
      id: `Berhasil mendapatkan data ${key}`
    },
    create: {
      en: `Create ${key} data successfully`,
      id: `Berhasil membuat data ${key}`
    },
    update: {
      en: `Update ${key} data successfully`,
      id: `Berhasil memperbarui data ${key}`
    },
    delete: {
      en: `Delete ${key} data successfully`,
      id: `Berhasil menghapus data ${key}`
    }
  }

  return messages[type][lang]
}

export const getErrorUnprocessableEntityMessage = (
  language: Languages = 'default'
) => {
  const lang = language === 'default' ? 'en' : language
  return lang === 'en'
    ? 'Unprocessable Entity: The request could not be processed.'
    : 'Entitas Tidak Dapat Diproses: Permintaan tidak dapat diproses.'
}

export const getErrorValidationRequiredMessage = (
  field: string,
  language: Languages = 'default'
) => {
  const lang = language === 'default' ? 'en' : language
  return lang === 'en'
    ? `Oops, ${field} cannot be empty`
    : `Oops, ${field} tidak boleh kosong`
}

export const getErrorValidationInvalidTypeMessage = (
  field: string,
  language: Languages = 'default'
) => {
  const lang = language === 'default' ? 'en' : language
  return lang === 'en'
    ? `Oops, ${field} must be a valid value`
    : `Oops, ${field} harus memiliki nilai yang valid`
}
