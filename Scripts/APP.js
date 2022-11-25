
function getWeatherData() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(weatherReq)
    }
    else {
        alert("Your browser does not support geolocation")
    }
}

function weatherReq(locationData) {
    let lat = locationData.coords.latitude
    let long = locationData.coords.longitude

    let apiString1 = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(1)}&longitude=${long.toFixed(1)}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum&timezone=auto`

    fetch(apiString1)
        .then(res => res.json())
        .then(data => setWeather(data))
        .catch(err => console.log(err))
}


function setWeather(data) {
    console.log(data)
    timeDates = document.getElementsByClassName("timeDate")
    minTemps = document.getElementsByClassName("min")
    maxTemps = document.getElementsByClassName("max")
    for (i in timeDates) {
        timeDates[i].innerHTML = data.daily.time[i]
        minTemps[i].innerHTML = data.daily.temperature_2m_min[i] + "°C"
        maxTemps[i].innerHTML = data.daily.temperature_2m_max[i] + "°C"
    }

}

function setDateOnNav() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    document.getElementById("CurrentDate").innerHTML = `${day}-${month}-${year}`
}

function checkDarkMode() {
    document.getElementById("checkBx").onchange = function () {
        if (document.getElementById("checkBx").checked === true) {
            setDarkMode()
        }
        else {
            setLightMode()
        }
    }
}

function setDarkMode(){
    document.getElementsByTagName("body")[0].style.backgroundColor = "black"
    document.getElementsByTagName("header")[0].style.color = "white"
    for(let i = 0; i<5; i++){
        document.getElementsByClassName("weatherBox")[i].style.color = "white"
        document.getElementsByClassName("weatherBox")[i].style.backgroundColor = "grey"
        document.getElementsByClassName("coverPic")[i].src = "./Images/icons8-night-96.jpg"
    }
}

function setLightMode(){
    document.getElementsByTagName("body")[0].style.backgroundColor = "white"
    document.getElementsByTagName("header")[0].style.color = "#FEE715FF"
    for(let i = 0; i<5; i++){
        document.getElementsByClassName("weatherBox")[i].style.color = "black"
        document.getElementsByClassName("weatherBox")[i].style.backgroundColor = "#FEE715FF"
        document.getElementsByClassName("coverPic")[i].src = "./Images/icons8-sun-192.png"
    }
}




getWeatherData()
setDateOnNav()
checkDarkMode()





