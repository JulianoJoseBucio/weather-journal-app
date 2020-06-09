// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=200e9405f32bfaa2099f29fb6e4a6297';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', createSomething);

/* Function called by event listener */

function createSomething(e) {
    const zipSearch = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    getWeather(baseURL, zipSearch, apiKey)
    .then(function(data) {
        let date = new Date(data.dt * 1000)
        let date_str = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        postData('/add', {temperature: data.main.temp, date: date_str, userResponse: userResponse});
        updateUI('/all');
    })
};

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipSearch, apiKey ) =>{
    const res = await fetch(baseURL + zipSearch + apiKey);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }catch(error) {
        console.log('error', error);
    };
};

/* Function to POST data */
const postData = async (url = '', data = {})=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await res.json();
        return newData;
    }catch(error) {
        console.log('error', error);
    };
};

/* Function to GET Project Data */
const updateUI = async() => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.userResponse;
    } catch(error) {
        console.log('error', error);
    };
};