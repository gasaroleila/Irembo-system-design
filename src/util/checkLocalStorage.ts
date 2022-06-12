export  function checkLocalStorage(key:string) {
  let keyValue: any =''
  try {
    if (typeof localStorage !== 'undefined') {
      keyValue = localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key) || '')
        : ''
    }
  } catch (e) {
    console.log('error ', e)
  }
  return keyValue
}
