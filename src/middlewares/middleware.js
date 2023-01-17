exports.middleGlobal = (req, res, next) => {
    res.locals.umaVariavelGlobal = "Este é o valor da variavel local"
    next()
}

exports.outroMiddleware = (req, res, next) => {
    next()
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.code) {
        return res.render('404')
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}