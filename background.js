const options = [
  chrome.webRequest.OnHeadersReceivedOptions.BLOCKING,
  chrome.webRequest.OnHeadersReceivedOptions.RESPONSE_HEADERS,
]
if(chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty('EXTRA_HEADERS')) {
  options.push(chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS)
}

const getHeaderModifier = () => details => {
  for (const responseHeader of details.responseHeaders) {
    if (responseHeader.name === 'Content-Type' &&
        responseHeader.value === 'text/html; charset=ISO-8859-1') {
      responseHeader.value = 'text/html; charset=utf-8'
    }
  }
  return { responseHeaders: details.responseHeaders }
}

chrome.webRequest.onHeadersReceived.addListener(getHeaderModifier(), { urls: ["https://user.well.com/engaged.cgi*"]}, options)