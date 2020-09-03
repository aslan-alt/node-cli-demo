const fs = require('fs')
const homedir = require('os').homedir()
const home = process.env.HOME || homedir
const path = require('path')
const dbPath = path.join(home, '.todo')

const db = {
    read(path = dbPath) {
        let list
        return new Promise((resolve, reject) => {
            fs.readFile(path, { flag: 'a+' }, (error, data) => {
                if (error) { return reject(error) }
                list = JSON.parse(data.toString() || "[]")
                resolve(list)
            })
        })
    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(path, string + '\n', (error) => {
                if (error) { return reject('写入失败') } resolve('写入成功')
            })
        })

    }
}
module.exports = db