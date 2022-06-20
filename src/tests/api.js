import axios from 'axios'

function logSuccess(req, res, next) {
  console.log(req, res)

  next(res)
}

function logError(req, res, e, next) {
  console.log(req, res, e)

  next(e)
}

function getResource(url, onComplete) {
  let _onSuccess = (res) => logSuccess(url, res, onComplete)
  let _onError = (res, e) => logError(url, res, e, onComplete)
  let _onException = (e) => logError(url, null, e, onComplete)

  axios
    .get(url)

    .then((res) => {
      res ? _onSuccess(res) : _onError(res)
    }, _onException)

    .catch(_onException)
}

function postResource(url, data, cancelTokenSource, onComplete) {
  let _onSuccess = (res) => logSuccess(url, res, onComplete)
  let _onError = (res, e) => logError(url, res, e, onComplete)
  let _onException = (e) => logError(url, null, e, onComplete)

  axios
    .post(url, data, { cancelToken: cancelTokenSource })

    .then((res) => {
      res ? _onSuccess(res) : _onError(res)
    }, _onException)

    .catch(_onException)
}

const apis = {
  getResource,
  postResource,
}

export default apis