const request = require('request')

const geocode = (latitud, longitud, callback) => {
    const url = 'https://api.darksky.net/forecast/82e142295847a304eebf3fcc1eb95a8e/' + latitud + ',' + longitud + '?units=si'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,  
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. ' + 
                'The minimum temperature is '+ body.daily.data[0].temperatureLow + ' and the maximun temperature is ' + body.daily.data[0].temperatureHigh)
        }
    })
}

module.exports = geocode
