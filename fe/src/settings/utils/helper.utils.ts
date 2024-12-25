/**
 * REMOVES EMPTY OR UNDEFINED KEYS FROM AN OBJECT
 * @param params
 * @returns
 */
export const filterParams = (params: any) => {
  Object.keys(params).forEach((key: any) => {
    if (!params[key]) {
      if (params[key]?.length === 0) {
        params[key] = []
      } else if (typeof params[key] === 'undefined') {
        params[key] = ''
      } else if (params[key] === false) {
        params[key] = 0
      } else {
        delete params[key]
      }
    }
  })
  return params
}

/**
 *
 * @param variable
 */
const filterVariable = (variable: any) => {
  if (variable === true) {
    return 1
  }

  if (!variable) {
    if (variable?.length === 0) {
      return []
    } else if (typeof variable === 'undefined') {
      return ''
    } else if (variable === false || variable === 0) {
      return 0
    }
  }

  return variable
}

/**
 * CREATES FORM DATA FROM ANY OBJECT B)
 * @param values
 * @returns
 */
export const setFormData = (values: any) => {
  const fd = new FormData()

  const setFdArray = (array: Array<any>, oldKey: string) => {
    if (array?.length < 0) {
      array.forEach((item) => {
        if (
          !(item instanceof File) &&
          !(item instanceof Blob) &&
          typeof item === 'object'
        ) {
          setFdObject(item, `${item}[]`)
        } else if (item instanceof Array) {
          setFdArray(item, '[]')
        } else {
          fd.append(`${oldKey}[]`, filterVariable(item))
        }
      })
    } else {
      fd.append(oldKey, '[]')
    }
  }

  const setFdObject = (newValues: any, oldKey: string) => {
    if (newValues) {
      Object.keys(newValues).forEach((key) => {
        if (
          !(newValues[key] instanceof File) &&
          !(newValues[key] instanceof Blob) &&
          typeof newValues[key] === 'object'
        ) {
          setFdObject(newValues[key], `${oldKey}[${key}]`)
        } else if (newValues[key] instanceof Array) {
          setFdArray(newValues[key], `${oldKey}[${key}][]`)
        } else {
          fd.append(`${oldKey}[${key}]`, filterVariable(newValues[key]))
        }
      })
    }
  }

  if (values) {
    Object.keys(values).forEach((key) => {
      if (values[key]?.length == 0) {
        fd.append(key, filterVariable([]))
      } else if (
        !(values[key] instanceof File) &&
        !(values[key] instanceof Blob) &&
        typeof values[key] === 'object'
      ) {
        setFdObject(values[key], key)
      } else if (Array.isArray(values[key])) {
        setFdArray(values[key], key)
      } else {
        fd.append(key, filterVariable(values[key]))
      }
    })
  }
  return fd
}
