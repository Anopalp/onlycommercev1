const notFound = (req, res, next) => {
	const error = new Error('Link not found')
	res.status(404)
	next(error)
}

const errorMiddleware = (error, req, res, next) => {
	const status = res.statusCode || 500
	const message = error.message
	const data = error.data

	res.status(status).json({ message: message, data: data })
}

module.exports = { notFound, errorMiddleware }
