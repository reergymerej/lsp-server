const headerContentDivider = '\r\n\r\n'

export const splitHeaderAndContent = (text) => {
  return text.split(headerContentDivider)
}

const maybeInt = (value) => {
  const parsedValue = parseInt(value)
  return isNaN(parsedValue)
    ? value
    : parsedValue
}

const parseHeaderLine = (headerString) => {
  const regex = /^(.+): (.+)/
  const parsedHeader = regex.exec(headerString)
  if (!parsedHeader) {
    return
  }
  const [, name, value] = parsedHeader
  return {
    name,
    value: maybeInt(value),
  }
}

export const parseHeaders = (text) => {
  const parts = text.split('\r\n')
  return parts.reduce((acc, headerString) => {
    const parsedHeader = parseHeaderLine(headerString)
    if (!parsedHeader) {
      return acc
    }
    const { name, value } = parsedHeader
    return {
      ...acc,
      [name]: value,
    }
  }, {})
}

export const parseContent = (json) => {
  return JSON.parse(json)
}

export const parseMessage = (rawMessage) => {
  const [headers, content] = splitHeaderAndContent(rawMessage)
  return {
    headers: parseHeaders(headers),
    body: parseContent(content),
  }
}
