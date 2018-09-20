
exports.success = (data) => {
  return {
    status: 0,
    msg: '',
    result: data || ''
  }
}

exports.failed = error => {
  return {
    status: 1,
    msg: error.message,
    result: ''
  }
}
