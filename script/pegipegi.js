function pegipegi() {
  let from = $('#from').val()
  let to = $('#to').val()
  let date = $('#date').val()
  $.ajax({
    method: 'post',
    url: `${baseURL}/pegipegi`,
    data: {
      originplace: from,
      destinationplace: to,
      outboundpartialdate: date
    }
  })
    .done((response) => {
      console.log(response)
      weather(response.weather.hours[0], response.flight.Places[1].CityName)
    })
    .fail((err) => {
      console.log(err)
    })
}

function weather(data, city) {
  $('.weather').append(`
  <div class="card m-3">
    <div class="card-body">
        <h5 class="card-title">Weather</h5>
        <p class="card-text"><i class="fas fa-city"></i> City: ${city}</p>
        <p class="card-text"><i class="fas fa-temperature-low"></i> Air temperature: ${data.airTemperature[0].value}°C</p>
        <p class="card-text"><i class="fas fa-cloud"></i> Cloud coverage: ${data.cloudCover[0].value}%</p>
        <p class="card-text"><i class="fas fa-wind"></i> Wind speed: ${data.windSpeed[0].value} m/s</p>
        <p class="card-text"><i class="fas fa-tint"></i> Humidity: ${data.humidity[0].value}%</p>
    </div>
  </div>
 `)
}