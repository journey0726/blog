
function myNew (fn, ...args) {
    let obj = {}
    obj.__proto__ = fn.prototype
    fn.apply(obj, args)
    return obj
}

function debounce(fn, delay) {
    let timer = null
    return function(...args) {
        if(timer) {
            clearTimeout(timer)
        }
        setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

function throttle(fn, delay) {
    let flag = true
    return function(...args) {
        if (!flag) return
        flag = false
        setTimeout(() => {
            fn(...args)
            flag = true
        }, 1000)
    }
}

//用setTimeOut 实现setInterval
function mySetTimeInter(fn, delay) {
    let timer = null
    const fnc = () => {
        fn()
        timer = setTimeout(() => {
            fnc()
        }, delay)
    }
    setTimeout(() => {
        fnc()
    }, delay)
    return function clear() {
        clearTimeout(timer)
    }
}

function compose(...fn) {
    if (fn.length === 0) {
        return n => n
    }
    if (fn.length === 1) {
        return fn[0]
    }
    return fn.reduce((pre, next) => {
        return (nums) => {
            return next(pre(nums))
        }
    })
}
