/**
 * Storage Utility
 */

const StorageImpl = () => {

  function getItem(storage: Storage, key: string) {
    const jsonStr = storage.getItem(key)
    if (!jsonStr) return null
    return JSON.parse(jsonStr)
  }

  function setItem(storage: Storage, key: string, value: any) {
      const obj = (value === undefined) ? null : value
      storage.setItem(key, JSON.stringify(obj))
  }

  function removeItem(storage: Storage, key: string) {
      storage.removeItem(key);
  }

  function clear(storage: Storage) {
    return storage.clear()
  }

  function findKey(storage: Storage, index: number) {
    return storage.key(index)
  }

  return {
    getItem, setItem, removeItem, clear, findKey
  }
}

const instance = StorageImpl()

export function getLocalItem(key: string) {
  return instance.getItem(localStorage, key)
}

export function setLocalItem(key: string, value: any) {
  return instance.setItem(localStorage, key, value)
}

export function removeLocalItem(key: string) {
  return instance.removeItem(localStorage, key)
}

export function getSessionItem(key: string) {
  return instance.getItem(sessionStorage, key)
}

export function setSessionItem(key: string, value: any) {
  return instance.setItem(sessionStorage, key, value)
}

export function removeSessionItem(key: string) {
  return instance.removeItem(sessionStorage, key)
}