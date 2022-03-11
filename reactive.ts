// 第一版
// let activeEffect: Function | undefined
// class Dep {
//     subscript: Set<Function> = new Set()
//     depend() {
//         if (activeEffect) {
//             this.subscript.add(activeEffect)
//         }
//     }
//     notify() {
//         this.subscript.forEach((effect) => effect())
//     }
// }

// function watchEffect(effect) {
//     activeEffect = effect
//     effect()
// }

// let dep = new Dep()

// let actualCount = 0
// const state = {
//     get count() {
//         dep.depend()
//         return actualCount
//     },
//     set count(newVal) {
//         actualCount = newVal
//         dep.notify()
//     }
// }


//第二版
// let activeEffect: Function | undefined
// class Dep {
//     subscribers: Set<Function> = new Set()
//     depend() {
//         this.subscribers.add(activeEffect)
//     }
//     notify() {
//         this.subscribers.forEach(effect => effect())
//     }
// }

// function watchEffect(effect) {
//     activeEffect = effect
//     effect()
// }

// function reactive(raw: object) {
//     Object.keys(raw).forEach(key => {
//         let dep = new Dep()
//         Object.defineProperty(raw, key, {
//             get() {
//                 dep.depend()
//                 return raw[key]
//             },
//             set(newVal) {
//                 raw[key] = newVal
//                 dep.notify()
//             }
//         })
//     })
// }

//第三版
let activeEffect: Function | undefined
class Dep {
    subscribers: Set<Function> = new Set()
    _value: any
    constructor(value: any) {
        this._value = value
    }
    get value() {
        this.depend()
        return this._value
    }
    set value(newVal) {
        this._value = newVal
        this.notify()
    }
    depend() {
        if (activeEffect) {
            this.subscribers.add(activeEffect)
        }
    }
    notify() {
        this.subscribers.forEach(effect => effect())
    }
}

function watchEffect(effect: Function) {
    activeEffect = effect
    effect()
    activeEffect = null
}
let reactiveHandlers: ProxyHandler<any> = {
    get(target, key) {
        const value = getDep(target, key).value
        if (value && typeof value === 'object') {
            return reactive(value)
        } else {
            return value
        }
    },
    set (target: any, key: any, value: any) {
        getDep(target, key).value = value
        return true
    }
}

const targetToHashMap = new WeakMap()
function getDep(target, key) {
    let depMap = targetToHashMap.get(target)
    if (!depMap) {
        depMap = new Map()
        targetToHashMap.set(target, depMap)
    }
    let dep = depMap.get(key)
    if (!dep) {
        dep = new Dep(target[key])
        depMap.set(key, dep)
    }
    return dep
}

function reactive(raw: object) {
    return new Proxy(raw, reactiveHandlers)
}