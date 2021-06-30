const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handle bars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Kamal Agarwal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kamal Agarwal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kamal Kumar',
        heperText: 'This is helper text.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You Must Provide an address.'
        })
    }

    geocode(req.query.address, (error, { lon, lat, loc } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lat, lon, loc, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({
                temp: data.temp,
                loc,
                des: data.des
            })
        })
    })


    // console.log(req.query.address)
    // res.send({
    //     forecast: 'Sunny.',
    //     location: req.query.address,
    //     temp: '32.8'
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You Must provide a search term'
        })
    }

    console.log(req.query.price)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kamal Kumar',
        errorMessage: 'Help artical not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kamal Kumar',
        errorMessage: 'Page Not Found'

    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})