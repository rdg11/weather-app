import React, { useState } from 'react'
import axios from 'axios'
import WeatherData from './components/WeatherData'

function App() {
	const [data, setData] = useState({})
	const [location, setLocation] = useState('')
	const [isError, setIsError] = useState(false)

	// please dont steal
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

	return (
		<div className="app">
			{/* Search Bar */}
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
			<WeatherData data={data} />
		</div>
	)
}

export default App
