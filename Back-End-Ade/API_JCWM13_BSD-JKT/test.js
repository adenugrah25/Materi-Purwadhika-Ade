// PROMISES and ERORR HANDLING
// promise => janji => ada kemungkinan => ditepati atau tidak
// promise in js => resolve, reject
// promise dipakai untuk bikin asynchrounous=> exp : axios
// axios.get(URL) => promise untuk get data
// resolve => result => .then(result)
// reject => error => .catch(error)
// karena process asynchrounous => tidak prioritaskan

const { generateQuery } = require("./helpers/queryHelp")

// Axios.get()
// console.log()

// example : asynchronous process => * need some time to completed the task
function asyncExample (numb) {
    return new Promise((resolve, reject) => {
        // fake async process
        setTimeout(() => numb < 0 ? reject(numb) : resolve(numb), 5000)
    })
}

// reject identic dengan error

// asyncExample(-10)
// .then(result => console.log('resolve : ', result))
// .catch(error => console.log('reject : ', error))

// console.log('example 1')
// console.log('example 2')
// console.log('example 3')

// ERORR HANDLING : try {...} catch {...}
// try {
//     console.log('try')
//     throw Error('ini erorr saat try')
// } catch (err) {
//     console.log(err)
// }

// function tryCatch (numb) {
//     try {
//         if (numb < 0) {
//             // throw Error('number bellow 0.')
//             // throw 'number bellow 0.'
//             throw { err : 'number below 0.' }
//         } else {
//             console.log(numb)
//         }
//     } catch (err) {
//         console.log(err)
//     }
// }

// tryCatch(-100)

// cara kedua untuk bikin asynchronous process pakai key aysnc
async function example() {
    return setTimeout(() => 10, 5000)
}

// example()
// console.log('async process')
const category_id = [
    {
        "id": 40
    },
    {
        "id": 4
    },
    {
        "id": 1
    }
]
const parent_id = 8

//cara Kiky
let str = ''
for (let i = 0; i < category_id.length; i++) {
    str += `(${parent_id}, ${category_id[i].id})`
}

console.log(`insert into product_category values ${str.slice(0,-1)}`)

//cara kak Ali
let qry = []
category_id.forEach(item => qry.push([parent_id, item.id]))
console.log(qry)

generateQuery : (body) => {
    let result = ''
    for (let key in body) {
        result += `${key} = '${body[key]}',`
    }
    return result.slice(0, -1)
}
console.log(generateQuery({
    username : 'corona2020'
}))