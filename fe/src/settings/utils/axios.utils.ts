import axios, { AxiosRequestConfig } from 'axios'
import { getLocalStorage } from '@/settings/utils/localstorage.utils'

/**
 * AXIOS WRAPPER
 * @param includeHeader
 * @param additionalConfig
 * @param additionalHeader
 */
const httpBase = (
  includeHeader = false,
  additionalConfig: AxiosRequestConfig = {},
  additionalHeader: Record<string, string> | undefined = undefined,
) => {


  /**
   * AXIOS INSTANCE
   */
  const defaultHeaders = {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    // authorization: `Bearer ${token}`,
  }

  const instance = axios.create({
    baseURL: 'http://localhost:5555',
    headers: additionalHeader
      ? { ...defaultHeaders, ...additionalHeader }
      : defaultHeaders,
    ...additionalConfig,
  })

  /**
   * RESPONSE INTERCEPTORS
   */
  instance.interceptors.response.use(
    // Success response interceptors
    (response) => {
      if (includeHeader) {
        return response
      }
      return response
    },
    // Error response interceptors
    async (error) => {
      const statusCode = error?.response?.status

      // UNAUTHORIZED
      if (statusCode === 401) {
        // const token = await getLocalStorage(AppConfig.auth_token)
        // if (token) {
        //   localStorage.clear()
        //   // store.dispatch(AuthSlice.actions.resetState())
        //   // message.error('Session expired !')
        // }
      } else if (statusCode === 404) {
        // router.navigate(defaultRoutes.not_found, {
        //     replace: true
        // })
      } else if (statusCode === 403) {
        // router.navigate(defaultRoutes.forbidden, {
        //     replace: true
        // })
      }
      return Promise.reject(error)
    },
  )

  return instance
}

export default httpBase
