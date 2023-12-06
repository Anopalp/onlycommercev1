const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const catalogueRoutes = require('./src/routes/catalogue')
const requestRoutes = require('./src/routes/request')

const { notFound, errorMiddleware } = require('./src/errorMiddleware')

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
app.use('/v1/requests', requestRoutes)

app.use(notFound)
app.use(errorMiddleware)

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(4000, () => console.log('Connection Success'))
	})
	.catch((err) => console.log(err))
