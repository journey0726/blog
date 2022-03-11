
class myPromise {
    static PENDING = Symbol()
    static FULFILL = Symbol()
    static REJECT = Symbol()
    status: Symbol
    result: any  //失败原因
    value: any   //成功结果
    callbackFulfill: any[]
    callbackReject: any[]
    constructor (exectors) {
        this.status = myPromise.PENDING
        this.value = undefined
        this.result = undefined
        this.callbackFulfill = []
        this.callbackReject = []
        try {
            exectors(this.resolve, this.reject)
        }catch (e) {
            this.reject(e)
        }
    }
    resolve = (res) => {
        if (this.status === myPromise.PENDING) {
            this.status = myPromise.FULFILL
            this.value = res
            setTimeout(() => {
                if (this.callbackFulfill.length > 0) {
                    this.callbackFulfill.forEach(fn => {
                        fn(res)
                    })
                }
            })
        }
    }
    reject = (res) => {
        if (this.status === myPromise.PENDING) {
            this.status = myPromise.REJECT
            this.result = res
        }
        setTimeout(() => {
            if (this.callbackReject.length > 0) {
                this.callbackReject.forEach(fn => {
                    fn(res)
                })
            }
        })
    }
    then (onFulfill, onReject){
        onFulfill = typeof onFulfill == 'function' ? onFulfill : value => value
        onReject = typeof onReject == 'function' ? onReject : value => value
        if (this.status === myPromise.FULFILL) {
            onFulfill(this.value)
        } else if (this.status === myPromise.REJECT) {
            onReject(this.result)
        } else {
            this.callbackFulfill.push(onFulfill)
            this.callbackReject.push(onReject)
        }
    }
}