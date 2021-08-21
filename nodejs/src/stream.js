// const Readable = require('stream').Readable

// class ToReadable extends Readable {

//     constructor(iterator) {
//         super()
//         this.iterator = iterator
//     }

//     _read() {
//         const res = this.iterator.next()

//         if (res.done) {
//             return this.push(null)
//         }
//         setTimeout(() => {
//             this.push(res.value + '\n')
//         }, 0);
//     }
// }

// const iterator = function (limit) {
//     return {
//         next: function () {
//             if (limit--) {
//                 return { done: false, value: limit + Math.random() }
//             }
//             return { done: true }
//         }
//     }
// }(10)

// const readable = new ToReadable(iterator)

// readable.on('data', data => process.stdout.write(data))
// readable.on('end', data => process.stdout.write('DONE'))

// const Writable = require('stream').Writable

// const writable = new Writable()

// writable._write = function (data, encoding, nextCallback) {
//     process.stdout.write(data.toString().toUpperCase())
//     process.nextTick(nextCallback)
// }
// writable.on('finish', () => process.stdout.write('Done'))

// writable.write('a' + '\n')
// writable.write('b' + '\n')
// writable.write('c' + '\n')

// // 再无数据写入流时，需要调用`end`方法
// writable.end()

// const { Writable } = require('stream')
// const outStream = new Writable({
//     write(chunk, encoding, callback) {
//         console.log(chunk.toString())
//         callback()
//     }
// })

// process.stdin.pipe(outStream)
// process.stdin.on('data', (data) => {
//     console.log(data.toString())
// })

const { Readable } = require('stream')
const inStream = new Readable({
    read() { }
})