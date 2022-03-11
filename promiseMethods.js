function all(promises) {
    let res = []
    let count = 0
    return new Promise((resolve, reject) => {
        function settlePro(index, val) {
            res[index] = val
            count++
            if (count === promises.length) {
                resolve(res)
            }
        }
        promises.forEach((promise, index) => {
            if(promise instanceof Promise) {
                promise.then((res) => {
                    settlePro(index, res)
                }, err => reject(err))
            } else {
                settlePro(index, promise)
            }
        })
    })
}

function race(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            if (promise instanceof Promise) {
                promise.then(res => {
                    resolve(res)
                },err => reject(err))
            } else {
                resolve(promise)
            }
        })
    })
}

function settled(promises) {
    let res = []
    let count = 0
    return new Promise((resolve, reject) => {
        function check () {
            if (promises.length === count) {
                resolve(res)
            }
        }
        promises.forEach((promise, index) => {
            if (promise instanceof Promise) {
                promise.then(res => {
                    res[index] = res
                    count++ 
                    check()
                }, err => {
                    res[index] = err
                    count++ 
                    check()
                })
            } else {
                res[index] = promise
                count++ 
                check()
            }
        })
    })
}

function any (promises) {
    let count = 0
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            if (promise instanceof Promise) {
                promise.then(res => {
                    resolve(res)
                }, err => {
                    count++
                    if (count === promise.length) {
                        reject(new Error('No Promise Resolve'))
                    }
                })
            } else {
                resolve(promise)
            }
        })
    })
}

Promise.prototype.myFinally = function(callback) {
    this.then(res => {
        callback()
        return res
    }, err => {
        callback()
        return res
    })
}