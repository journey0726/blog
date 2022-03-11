console.log(1)
setTimeout(() => {
  console.log(2)
  setTimeout(() => {
    console.log('set')
  })
  new Promise(resolve => {
    console.log(4)
    resolve()
  }).then(() => {
    console.log(5)
  })
})

new Promise(resolve => {
  console.log(7)
  resolve()
}).then(() => {
  console.log(8)
})


setTimeout(() => {
  console.log(9)
  new Promise(resolve => {
    console.log(11)
    resolve()
  }).then(() => {
    console.log(12)
  })
})