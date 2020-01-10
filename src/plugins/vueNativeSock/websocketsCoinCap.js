import store from '@/store'

function createPassToStoreHandler(eventsSettings = {}) {
  return function (currEventName, event) {
    if (!currEventName.startsWith('SOCKET_')) return

    currEventName = currEventName.replace('SOCKET_', '')

    let eventSettings = {
      namespace: '',
      methodType: 'commit',
      methodName: currEventName.toUpperCase(),
    }

    const msg = event.data ? JSON.parse(event.data) : {}

    if (eventsSettings[currEventName]) {
      eventSettings = { ...eventSettings, ...eventsSettings[currEventName] }
    }

    eventSettings.methodName = 'SOCKET_' + eventSettings.methodName
    const methodNameFull = eventSettings.namespace + eventSettings.methodName
    this.store[eventSettings.methodType](methodNameFull, msg)
  }
}

function createOptions(options = {}, eventsSettings = {}) {
  options = {
    ...options,
    store,
    format: 'json',
    reconnection: true,
  }
  const result =  {
    ...options,
    passToStoreHandler: createPassToStoreHandler(eventsSettings),
  }
  return result
}

export default createOptions
