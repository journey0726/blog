Function.prototype.myCall = function (obj, ...args) {
    obj = obj || globalThis
    let fn = Symbol()
    obj[fn] = this
    setTimeout(() => {
        delete obj[fn]
    })
    return obj[fn](...args)
}

Function.prototype.myApply = function (obj, args) {
    obj = obj || globalThis
    let fn = Symbol()
    obj[fn] = this
    setTimeout(() => {
        delete obj[fn]
    })
    return obj[fn](...args)
}

Function.prototype.MyBind = function(obj, ...args) {
    obj = obj || globalThis
    let fn = Symbol()
    obj[fn] = this
    const _this = this
    const res = function(...innerArgs) {
        if (this instanceof _this) {  //判断是不是new 操作
            this[fn] = _this
            this[fn](...args, ...innerArgs)
            delete this[fn]
        } else {
            obj[fn](...args, ...innerArgs)
            delete obj[fn]
        }
    }
    res.prototype = Object.create(this.prototype)
    return res
}

function myBind (obj = globalThis, ...args) {
    let fn = Symbol()
    obj[fn] = this
    const _this = this
    const res = function(...innerArgs) {
        if (this instanceof _this) {
            this[fn] = _this
            this[fn](...args, ...innerArgs)
            delete this[fn]
        } else {
            obj[fn](...args, ...innerArgs)
            delete obj[fn]
        }
    }
    res.prototype = Object.create(this.prototype) 
    return res
}