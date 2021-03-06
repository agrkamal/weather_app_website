const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#error')
const messagetwo = document.querySelector('#weather')

const fetchWeather = (location) => {

    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ''

    fetch('/weather?address=' + location).then((res) => {
        console.log(res)

        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = `${data.error}`
            } else {
                messageOne.textContent = ''
                messagetwo.textContent = `It is ${data.temp} degress celcius in ${data.loc}. Feels like ${data.feels_like} degress celcius and condition is ${data.des}.`
            }
        })

    })
}



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetchWeather(location)
})