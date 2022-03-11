Array.prototype.myForEach = function(callback) {
    for(let i = 0; i < this.length; i++) {
        callback(this[i], i, this)
    }
}

Array.prototype.myMap = function(callback) {
    let res = []
    for (let i = 0; i < this.length; i++) {
        let r = callback(this[i], i, this)
        res.push(r)
    }
    return res
}

Array.prototype.myFilter = function(callback) {
    let res = []
    for (let i = 0; i < this.length; i++) {
        let flag = callback(this[i], i, this)
        flag && res.push(this[i])
    }
    return res
}

 Array.prototype.mySome = function(callback) {
    let flag = false
    for (let i = 0; i < this.length; i++) {
        flag = callback(this[i], i, this)
        if (flag) {
            break
        }
    }   
    return flag
 }

 Array.prototype.myEvery = function(callback) {
    let flag = true
    for (let i = 0; i < this.length; i++) {
        flag = callback(this[i], i, this)
        if (!flag) {
            break
        }
    }   
    return flag
 }

 Array.prototype.myReduce = function(callback, ...args) {
    let start = 0
    let pre
    if (args.length) {
        pre = args[0]
    } else {
        pre = this[0]
        start = 1
    }
    for (let i = 0; i < this.length; i++) {
        pre = callback(pre, this[i], i, this)
    }
    return pre
 }

 Array.prototype.myFindIndex = function(callback) {
     let index = -1
    for (let i = 0; i < this.length; i++) {
        let flag = callback(this[i], i, this)
        if (flag) {
            index = i
            break
        }
    }
    return index
 }

 Array.prototype.myFind = function(callback) {
    for (let i = 0; i < this.length; i++) {
       if (callback(this[i], i, this)) {
           return this[i]
       }
    }
    return undefined
 }
 Array.prototype.myFill = function(val, start = 0, end) {
    end = end || this.length
    for (let i = start; i < end; i++) {
        this[i] = val
    }
    return this
 }

 Array.prototype.myIncludes = function(val, start) {
    start = start || 0
    let flag = Number.isNaN(val)
    for (let i = start; i < this.length; i++) {
        if (this[i] === val || Number.isNaN(this[i] === flag)) {
            return true
        }
    }
    return false
 }

 Array.prototype.MyJoin = function(s = ',') {
     let str = ''
    for (let i = 0; i < this.length - 1; i++) {
        str += this[i] + s
    }
    str += this[this.length - 1]
    return str
 }

 Array.prototype.myFlat = function(num = 1) {
    let arr = []
    while(this.some(item => Array.isArray(item))){
        arr.concat(this)
    }
    return arr
 }