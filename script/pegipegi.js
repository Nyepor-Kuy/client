function pegipegi() {
  let from = $('#from').val()
  let to = $('#to').val()
  let date = $('#date').val()

  Swal.fire({
    title: `Fetching data from server...`,
    allowOutsideClick: () => !Swal.isLoading()
  });
  Swal.showLoading();

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
      $('.weather').empty()
      $('#price-box').empty()
      console.log(response)
      weather(response.weather.hours[0], response.flight.Places[1].CityName)
      flight(response.flight)
      event(response.event)
      Swal.close()
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

function flight(data) {
  if (data.Quotes.length === 0) {
    $('#price-box').append(`
      <h1>No data is found for that specific date</h1>
    `)
  } else {
    let date = new Date(data.Quotes[0].OutboundLeg.DepartureDate).toLocaleDateString()
    $('#price-box').append(`
    <div class="card m-3">
      <img id="ticket-img"
        src="https://static.makeuseof.com/wp-content/uploads/2013/11/tickets-money-670x335.jpg"
        class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">Lowest Fare Ticket</h5>
        <div id="head">
            <p class="card-text"><i class="fas fa-building"></i> ${data.Carriers[0].Name}</p>
        </div>
        <div id="center">
            <p class="card-text"><i class="fas fa-plane-departure"></i> ${data.Places[0].CityName}</p>
            <p class="card-text"><i class="fas fa-plane-arrival"></i> ${data.Places[1].CityName}</p>
        </div>
        <div id="bottom">
            <p class="card-text"><i class="fas fa-calendar-day"></i> ${date}</p>
            <p class="card-text"><i class="fas fa-coins"></i> Rp ${data.Quotes[0].MinPrice},-</p>
        </div>
      </div>
    </div>
  `)
  }
}

function event(data) {

  for (let i = 0; i < 3; i++) {
    let dateStart = new Date(data.events[i].start.local).toLocaleDateString()
    let dateEnd = new Date(data.events[i].end.local).toLocaleDateString()
    $('.event').append(`
        <div class="card m-3">
          <img id="event-img" class="card-img-top"
              src="${data.events[i].logo.original.url}"
              alt="Card image cap">
          <div class="card-body">
            <div id="header">
                <h5 class="card-title">${data.events[i].name.text}</h5>
            </div>
            <div id="body">
                <p class="card-text">${data.events[i].summary}</p>
            </div>
            <div id="date" class="my-2">
                <small class="text-muted"><i class="fas fa-calendar-alt"></i> Start: ${dateStart}</small>
                <small class="text-muted"><i class="fas fa-calendar-alt"></i> End: ${dateEnd}</small>
            </div>
            <div id="footer" class="mt-3">
                <a href="${data.events[i].url}"
                    class="btn btn-primary">Books Your Tickets</a>
            </div>
          </div>
        </div>
    `)
  }
}