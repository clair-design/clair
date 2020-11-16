function getError(action, xhr, method) {
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

function getBody(xhr) {
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

export default function upload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    throw new Error('The current environment does not support uploading')
  }

  const xhr = new XMLHttpRequest()
  const { action } = option

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      option.onProgress(e)
    }
  }

  const formData = new FormData()

  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formData.append(key, option.data[key])
    })
  }

  formData.append(option.filename, option.file, option.file.name)

  xhr.onerror = function error(e) {
    option.onError(e)
  }

  xhr.onload = function onload() {
    // eslint-disable-next-line no-magic-numbers
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, xhr, option.method))
    }

    option.onSuccess(getBody(xhr))
  }

  xhr.open(option.method, action, true)

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const { headers = {} } = option

  Object.keys(headers).forEach(item => {
    if (headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item])
    }
  })
  xhr.send(formData)
  return xhr
}
