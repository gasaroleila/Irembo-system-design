import axios from 'axios'

function logSuccess(req:any, res:any, next:any) {
  console.log(req, res)

  next(res)
}

function logError(req:any, res:any, e:any, next:any) {
  console.log(req, res, e)

  next(e)
}

function getResource(url:string, onComplete:any) {
  let _onSuccess = (res:any) => logSuccess(url, res, onComplete)
  let _onError = (res:any, e:any) => logError(url, res, e, onComplete)
  let _onException = (e:any) => logError(url, null, e, onComplete)

  axios
    .get(url)

    .then((res:any) => {
      res ? _onSuccess(res) : _onError(res,"")
    }, _onException)

    .catch(_onException)
}

function postResource(url:string, data:any, cancelTokenSource:any, onComplete:any) {
  let _onSuccess = (res:any) => logSuccess(url, res, onComplete)
  let _onError = (res:any, e:any) => logError(url, res, e, onComplete)
  let _onException = (e:any) => logError(url, null, e, onComplete)

  axios
    .post(url, data, { cancelToken: cancelTokenSource })

    .then((res:any) => {
      res ? _onSuccess(res) : _onError(res,"")
    }, _onException)

    .catch(_onException)
}

const apis = {
  getResource,
  postResource,
}

export default apis