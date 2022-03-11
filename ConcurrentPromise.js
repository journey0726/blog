class ConcurrentPromise {
    constructor(limit) {
        this.limit = limit
        this.count = 0
        this.task = []
    }
    add(timer, order) {
        this.task.push(() => {
            return new Promise((res) => {
                setTimeout(() => {
                    console.log(order)
                    res()
                }, timer)
            })
        })
    }
    start() {
        for(let i = 0; i < this.limit; i++ ) {
            this.request()
        }
    }
    request() {
        if (!this.task.length || this.limit <= this.count) return 
        this.count++
        this.task.shift()().then(() => {
            this.count--
            this.request()
        })

    }
}