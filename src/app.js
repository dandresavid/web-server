const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index',{
    title: 'Weather app',
    name: 'Andres'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Andres'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help me',
    name: 'Andres'
  })
})

app.get('/weather',(req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  const address = req.query.address
  geocode(address, (error, {latitude,longitude,location} = {}) => {
    if  (error){
      return error
    }
    forecast(latitude,longitude, (error, forecastData) => {
      if (error) {
        return error
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: [req.query.search]
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andres',
    errorMessage: 'help article not found'
  })
})

app.get('*',(req,res) => {
  res.render('404', {
    title: '404',
    name: 'Andres',
    errorMessage: 'My 404 page'
  })
})

app.listen(port, ()=> {
  console.log('Server is up on port ' + port)
})
