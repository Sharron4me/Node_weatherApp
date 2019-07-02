
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const result = document.querySelector('#result');
const result_weather = document.querySelector('#result_weather');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    result.textContent="Loading ...";
       // console.log('Testing');
    const location = search.value;
    //weather(location);
    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            result.textContent=data.error;
            console.log(data.error);
        }
        else
        {
            result.innerHTML = "<br>"+data.place + "<br>" ;
            result_weather.innerHTML =  data.forecast;
            console.log(data.place);
            console.log(data.forecast);
        }
    })
})
});


