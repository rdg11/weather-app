import React from 'react'
import Thunderstorm from '../assets/icons/thunder.svg'
import Drizzle from '../assets/icons/rainy-4.svg'
import Rain from '../assets/icons/rainy-6.svg'
import Snow from '../assets/icons/snowy-6.svg'
import Atmosphere from '../assets/icons/cloudy.svg'
import Clear from '../assets/icons/cloudy-day-1.svg'
import Clouds from '../assets/icons/cloudy-day-3.svg'

function WeatherData({ data }) {
	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]

	const date = new Date()
	// get the date as a string
	let n = date.getDay()
	let day = days[n]
	// get the time as a string
	let hour = date.getHours()
	let ampm = hour >= 12 ? 'PM' : 'AM'

	let currentDate = `${day} ${hour % 12 === 0 ? 12 : hour % 12}:00 ${ampm} `
	// let test = 0
	// console.log('TIME', test % 12 === 0 ? 12 : test % 12)

	const weatherConditions = [
		{ id: 2, condition: 'Thunderstorm', icon: Thunderstorm },
		{ id: 3, condition: 'Drizzle', icon: Drizzle },
		{ id: 5, condition: 'Rain', icon: Rain },
		{ id: 6, condition: 'Snow', icon: Snow },
		{ id: 7, condition: 'Atmosphere', icon: Atmosphere },
		{ id: 8, condition: 'Clear', icon: Clear },
		{ id: 9, condition: 'Clouds', icon: Clouds },
	]

	function displayIcon(id) {
		if (id > 800) {
			return Clouds
		}
		const found = weatherConditions.find(
			element => element.id === Math.floor(id / 100)
		)
		// console.log('WEATHER ID:', found.id)
		return found.icon
	}

	return (
		<div className="app">
			<div className="container">
				{/* Left Weather Data */}
				{data.name ? (
					<div className="main-data">
						<div className="location">
							<h2>{data.name}</h2>
						</div>
						<div className="date">
							<p>{currentDate}</p>
						</div>
						<div className="description">
							<p>{data.weather[0].main}</p>
						</div>
						<div className="temp">
							<h1>{data.main.temp.toFixed()}°F</h1>
						</div>
					</div>
				) : null}

				{/* Middle Icon */}
				<div className="icon">
					{data.weather ? (
						<img
							className="icon"
							src={displayIcon(data.weather[0].id)}
							alt="Weather Icon"
						/>
					) : null}
				</div>

				{/* Right Weather Data */}
				{data.name ? (
					<div className="extra-data">
						<div className="feels">
							<h3>Feels Like</h3>
							<p>{data.main.feels_like.toFixed()}°F</p>
						</div>
						<div className="humidity">
							<h3>Humidity</h3>
							<p>{data.main.humidity}%</p>
						</div>
						<div className="wind">
							<h3>Wind Speed</h3>
							<p>{data.wind.speed.toFixed()} mph</p>
						</div>
					</div>
				) : null}
			</div>
		</div>
	)
}

export default WeatherData
