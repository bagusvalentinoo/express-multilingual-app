import request from 'supertest'

import app from '../src/app'
import {
  MakeRequestOptions,
  GetSuccessDataResourceMessageOptions
} from './test-util.type'

export const makeRequest = async ({
  method,
  url,
  data,
  language = 'default'
}: MakeRequestOptions) => {
  const req = request(app)[method](url)

  if (data) req.send(data)
  if (language && language !== 'default') req.set('Accept-Language', language)

  return req
}

export const getSuccessDataResourceMessage = ({
  type,
  key,
  language = 'default'
}: GetSuccessDataResourceMessageOptions) => {
  if (language === 'default') language = 'en'

  const messages = {
    get: {
      en: `Get ${key} data successfully`, // Message Get Data Success in English
      id: `Berhasil mendapatkan data ${key}` // Message Get Data Success in Bahasa Indonesia
    },
    create: {
      en: `Create ${key} data successfully`, // Message Create Data Success in English
      id: `Berhasil membuat data ${key}` // Message Create Data Success in Bahasa Indonesia
    },
    update: {
      en: `Update ${key} data successfully`, // Message Update Data Success in English
      id: `Berhasil memperbarui data ${key}` // Message Update Data Success in Bahasa Indonesia
    },
    delete: {
      en: `Delete ${key} data successfully`, // Message Delete Data Success in English
      id: `Berhasil menghapus data ${key}` // Message Delete Data Success in Bahasa Indonesia
    }
  }

  return messages[type][language]
}

export const getErrorUnprocessableEntityMessage = (
  language: string = 'default'
) => {
  if (language === 'default') language = 'en'

  return language === 'en'
    ? 'Unprocessable Entity: The request could not be processed.' // Message Error Unprocessable Entity in English
    : 'Entitas Tidak Dapat Diproses: Permintaan tidak dapat diproses.' // Message Error Unprocessable Entity in Bahasa Indonesia
}

export const getErrorValidationRequiredMessage = (
  field: string,
  language: string = 'default'
) => {
  if (language === 'default') language = 'en'

  return language === 'en'
    ? `Oops, ${field} cannot be empty` // Message Error Validation Required in English
    : `Oops, ${field} tidak boleh kosong` // Message Error Validation Required in Bahasa Indonesia
}

export const getErrorValidationInvalidTypeMessage = (
  field: string,
  language: string = 'default'
) => {
  if (language === 'default') language = 'en'

  return language === 'en'
    ? `Oops, ${field} must be a valid value` // Message Error Validation Invalid Type in English
    : `Oops, ${field} harus memiliki nilai yang valid` // Message Error Validation Invalid Type in Bahasa Indonesia
}
