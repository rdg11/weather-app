import React, { useState } from 'react'
import axios from 'axios'
import Thunderstorm from './assets/icons/thunder.svg'
import Drizzle from './assets/icons/rainy-4.svg'
import Rain from './assets/icons/rainy-6.svg'
import Snow from './assets/icons/snowy-6.svg'
import Atmosphere from './assets/icons/cloudy.svg'
import Clear from './assets/icons/cloudy-day-1.svg'
import Clouds from './assets/icons/cloudy-day-3.svg'

function App() {
	const [data, setData] = useState({})
	const [location, setLocation] = useState('')
	const [isError, setIsError] = useState(false)

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=260f56eb2f7c8a27037c245a53c32ecc`

	function searchLocation(e) {
		setIsError(false)
		e.preventDefault()

		axios
			.get(url)
			.then(response => {
				setIsError(false)
				setData(response.data)
				console.log(response.data)
			})
			.catch(err => {
				setIsError(true)
				console.log(err)
			})

		setLocation('')
	}

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

	let currentDate = `${day} ${hour % 12}:00 ${ampm} `

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
		console.log('WEATHER ID:', found.id)
		return found.icon
	}

	return (
		<div className="app">
			{/* SearchLocation Component */}
			<form onSubmit={searchLocation} autoComplete="off">
				<div className={isError ? 'searchShake' : 'search'}>
					<input
						className="search-input"
						type="text"
						value={location}
						onChange={e => setLocation(e.target.value)}
						placeholder="Enter a City, State, or Country"
						maxLength={100}
					/>
					<button className="btn search-btn">Search</button>
				</div>
				{/* <p>{isError ? 'Invalid Location' : ''}</p> */}
			</form>

			<div className="container">
				{/* MainData Component */}
				{data.main ? (
					<div className="main-data">
						<div className="location">
							{data.name ? <h2>{data.name}</h2> : null}
						</div>
						<div className="date">
							{data.name ? <p>{currentDate}</p> : null}
						</div>
						<div className="description">
							{data.weather ? <p>{data.weather[0].main}</p> : null}
						</div>
						<div className="temp">
							{data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
						</div>
					</div>
				) : null}

				{/* Icon Component */}
				<div className="icon">
					{data.weather ? (
						<img
							className="icon"
							src={displayIcon(data.weather[0].id)}
							alt="Weather Icon"
						/>
					) : null}
				</div>

				{/* ExtraData Component */}
				{data.main ? (
					<div className="extra-data">
						<div className="feels">
							{data.main ? <h3>Feels Like</h3> : null}
							{data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
						</div>
						<div className="humidity">
							{data.main ? <h3>Humidity</h3> : null}
							{data.main ? <p>{data.main.humidity}%</p> : null}
						</div>
						<div className="wind">
							{data.wind ? <h3>Wind Speed</h3> : null}
							{data.wind ? <p>{data.wind.speed.toFixed()} mph</p> : null}
						</div>
					</div>
				) : null}
			</div>
		</div>
	)
}

export default App
