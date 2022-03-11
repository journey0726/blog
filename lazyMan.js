function lazeMan(name) {
    let task = []
    let fn = () => {
        console.log('hello,' + name)
        next()
    };
    task.push(fn)
    let next = () => {
        let a = task.shift() 
        a && a()
    }
    setTimeout(() => {
        next()
    })
    let api = {
        sleep: (time) =>{
            let fun = () => {
                setTimeout(() => {console.log('wait  ' + time); next()},time)
            }
            task.push(fun)
            return api
        },
        eat: (something)=> {
            let fun = () => {
                console.log('Eat ' + something)
                next()
            }
            task.push(fun)
            return api
        },
        sleepFirst: (time) => {
            let fun = () => {
                setTimeout(() => {console.log('first wait' + time); next()}, time)
            }
            task.unshift(fun)
            return api
        }
    }
    return api
}