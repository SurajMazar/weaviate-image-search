import { FetchQueryOptions } from 'react-query'
import httpBase from '@/settings/utils/axios.utils'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { filterParams, setFormData } from '@/settings/utils/helper.utils'

class Http {
  /**
   * GET REQUEST
   * @param url
   * @param params
   * @param responseHeader
   * @param additionalParams
   * @param additionalHeaders
   * @param additionalAxiosOptions
   */
  async get(
    url: string,
    params: FetchQueryOptions | null = null,
    additionalParams: Record<string, unknown> = {},
    responseHeader = false,
    additionalHeaders: Record<string, string> | undefined = undefined,
    additionalAxiosOptions: AxiosRequestConfig = {},
  ) {
    params = filterParams(
      params && params?.queryKey
        ? { ...(params.queryKey[0] as Record<string, unknown>) }
        : {},
    )

    return await httpBase(
      responseHeader,
      additionalAxiosOptions,
      additionalHeaders,
    ).get(url, {
      params: {
        ...params,
        ...additionalParams,
      },
    })
  }

  /**
   *
   * @param url
   * @param data
   * @param makeFormData
   * @param responseHeader
   * @param additionalHeaders
   * @param additionalAxiosOptions
   */
  async post<T extends Record<string, any>>(
    url: string,
    data?: T,
    makeFormData = false,
    responseHeader = false,
    additionalHeaders: Record<string, string> | undefined = undefined,
    additionalAxiosOptions: AxiosRequestConfig = {},
  ) {
    const formData = makeFormData ? setFormData(filterParams(data)) : data
    return await httpBase(
      responseHeader,
      additionalAxiosOptions,
      additionalHeaders,
    ).post(url, formData)
  }

  /**
   *
   * @param url
   * @param data
   * @param makeFormData
   * @param responseHeader
   * @param additionalHeaders
   * @param additionalAxiosOptions
   */
  async put<T extends Record<string, any>>(
    url: string,
    data?: T,
    makeFormData = false,
    responseHeader = false,
    additionalHeaders: Record<string, string> | undefined = undefined,
    additionalAxiosOptions: AxiosRequestConfig = {},
  ) {
    const formData = makeFormData ? setFormData(filterParams(data)) : data
    return await httpBase(
      responseHeader,
      additionalAxiosOptions,
      additionalHeaders,
    ).put(`${url}`, formData)
  }

  /**
   *
   * @param url
   * @param data
   * @param makeFormData
   * @param responseHeader
   * @param additionalHeaders
   * @param additionalAxiosOptions
   */
  async patch<T extends Record<string, any>>(
    url: string,
    data?: T,
    makeFormData = false,
    responseHeader = false,
    additionalHeaders: Record<string, string> | undefined = undefined,
    additionalAxiosOptions: AxiosRequestConfig = {},
  ) {
    const formData = makeFormData ? setFormData(filterParams(data)) : data
    return await httpBase(
      responseHeader,
      additionalAxiosOptions,
      additionalHeaders,
    ).patch(`${url}`, formData)
  }

  /**
   * DELETE REQUEST
   * @param url
   * @param responseHeader
   * @param additionalHeaders
   * @param additionalAxiosOptions
   */
  async delete(
    url: string,
    responseHeader = false,
    additionalHeaders: Record<string, string> | undefined = undefined,
    additionalAxiosOptions: AxiosRequestConfig = {},
  ) {
    return await httpBase(
      responseHeader,
      additionalAxiosOptions,
      additionalHeaders,
    ).delete(`${url}`)
  }
}

/**
 *
 * @param exception
 */
export const handleError = (exception: AxiosError) => {
  if (exception && exception.response && exception.response.data) {
    const error = exception?.response?.data as Record<string, unknown>
    if (error.errors && Object.keys(error.errors).length) {
      return error.errors
    } else if (error.message) {
      return { message: error.message }
    }
  } else {
    return { message: 'Something went wrong' }
  }
}

export default new Http()
