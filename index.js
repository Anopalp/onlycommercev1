const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const catalogueRoutes = require('./src/routes/catalogue')

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE, OPTIONS'
	)
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})

app.use(express.json())

app.use('/v1/catalogue', catalogueRoutes)

app.use((error, req, res, next) => {
	const status = error.errorStatur || 500
	const message = error.message
	const data = error.data

	res.status(status).json({ message: message, data: data })
})

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(4000, () => console.log('Connection Success'))
	})
	.catch((err) => console.log(err))
