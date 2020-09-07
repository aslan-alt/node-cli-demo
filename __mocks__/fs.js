const fs = jest.createMockFromModule('fs');
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

let readMocks = {}
fs.setReadMock = (path, error, data) => {
    readMocks[path] = [error, data]
}
fs.readFile = (path, options, callBack) => {
    if (callBack === undefined) { callBack = options }
    if (path in readMocks) {
        callBack(...readMocks[path])
    } else {
        _fs.readFile(path, options, callBack)
    }
}


let writeMocks = {}
fs.setWriteFileMock = (path, fn) => {
    writeMocks[path] = fn
}

fs.writeFile = (path, data, options, callBack) => {
    if (callBack === undefined) { callBack = options }
    if (path in writeMocks) {
        writeMocks[path](path, data, options, callBack)
    }
    else {
        _fs.writeFile(path, data, options, callBack)
    }
}
fs.clearMocks = () => {
    readMocks = {}
    writeMocks = {}
}


module.exports = fs;