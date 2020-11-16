function getError(action: string, xhr: XMLHttpRequest, method: string): Error {
  let msg
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`
  } else {
    msg = `fail to ${method} ${action} ${xhr.status}`
  }

  return new Error(msg)
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export interface RequestOption {
  action: string
  data?: {
    [key: string]: any
  }
  filename: string
  file: File
  method?: string
  withCredentials?: boolean
  headers?: {
    [key: string]: any
  }
  onProgress?: (e: ProgressEvent<EventTarget>) => void
  onError?: (e: Error | ProgressEvent<EventTarget>) => void
  onSuccess?: (e: object) => void
}

/**
 * 请求接口数据
 * @param option
 */
export const ajax = (option: RequestOption) => {
  const {
    action,
    data = {},
    filename,
    file,
    method = 'GET',
    withCredentials = false,
    headers = {},
    onProgress,
    onSuccess,
    onError
  } = option

  if (typeof XMLHttpRequest === 'undefined') {
    throw new Error('The current environment does not support uploading')
  }

  const xhr = new XMLHttpRequest()

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      onProgress && onProgress(e)
    }
  }

  const formData = new FormData()

  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })

  formData.append(filename, file, file.name)

  xhr.onerror = function error(e) {
    onError && onError(e)
  }

  xhr.onload = function onload() {
    // eslint-disable-next-line no-magic-numbers
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError && onError(getError(action, xhr, method))
    }

    onSuccess && onSuccess(getBody(xhr))
  }

  xhr.open(method, action, true)

  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  Object.keys(headers).forEach(item => {
    if (headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item])
    }
  })
  xhr.send(formData)
  return xhr
}
