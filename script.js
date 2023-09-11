const container = document.querySelector( ".container" );
const search  = document.querySelector( ".search-box button" );
const weatherBox = document.querySelector( ".weather-box" );
const weatherDetails = document.querySelector( ".weather-details" );
const error = document.querySelector( ".not-found" );

search.addEventListener( 'click', () => {
  const APIkey = `yourApiKey`;
  const city = document.querySelector( '.search-box input' ).value;
  if ( city === '' ) {
    container.style.height = '105px';
  }
  fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}` )
    .then( res => res.json() )
    .then( data => {
      if ( data.cod == '404' ) {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error.style.display = 'block';
        error.classList.add( 'fadeIn' )
        return;
      }
      error.style.display = 'none';
      error.classList.remove( 'fadeIn' )

      const image = document.querySelector( '.weather-box img' );
      const temperature = document.querySelector( '.weather-box .temperature' );
      const description = document.querySelector( '.weather-box .description' );
      const humidity = document.querySelector('.weather-details .humidity span')
      const wind = document.querySelector( '.weather-details .wind span' )
      switch (data.weather[0].main) {
        case 'Clear':
          image.src = './img/clear.png';
          break;
        case 'Rain':
          image.src = './img/rain.png';
          break;
        case 'Snow':
          image.src = './img/snow.png';
          break;
        case 'Clouds':
          image.src = './img/cloud.png';
          break;
        case 'Haze':
          image.src = './img/mist.png';
          break;
        default:
          image.src = '';
          break;
      }
      temperature.innerHTML = `${ parseInt( data.main.temp ) }<span>°C</span>`;
      description.innerText = `${ data.weather[0].description }`;
      humidity.innerText = `${ data.main.humidity }%`;
      wind.innerText = `${ parseInt( data.wind.speed ) }Km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn')
      weatherDetails.classList.add( 'fadeIn' )
      container.style.height = '590px'
    } )
} )