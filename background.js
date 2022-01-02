var options = ['responseHeaders','blocking']

if(chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty('EXTRA_HEADERS')) {
  options.push('extraHeaders')
}

chrome.webRequest.onHeadersReceived.addListener((details) => {
    for (const responseHeader of details.responseHeaders) {
    if (responseHeader.name === 'Content-Type' &&
        responseHeader.value === 'text/html; charset=ISO-8859-1') {
      responseHeader.value = 'text/html; charset=utf-8'
    }
  }
  return {responseHeaders: details.responseHeaders}
}, {urls: ["https://user.well.com/engaged.cgi*"]}, options)
