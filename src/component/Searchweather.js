import axios from 'axios'
import React, { useState } from 'react'

function Searchweather() {
    const [data, setdata] = useState({
        celcius: 10,
        name: 'London',
        temp_min:15,
        temp_max:19,
        humidity: 20,
        image:'/Images/cloud.jpg'
    })
    const [name,setname]=useState('');
        const [error,seterror]=useState('');

      
    const handleClick = ()=> {
        if(name !== "") {
            const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c112f1a6b1361f4a889f3b3c318ebf7e&units=metric`;
            axios.get(apiurl)
                .then(res => {
                    let imagePath= '';
                    if(res.data.weather[0].main == "Clouds"){
                        imagePath="/Images/cloud.jpg"
                    }else if(res.data.weather[0].main == "Clear"){
                        imagePath="/Images/clear.jpg"
                    }else if(res.data.weather[0].main == "Rain"){
                        imagePath="/Images/rain.jpg"
                    }else if(res.data.weather[0].main == "Drizzle"){
                        imagePath="/Images/drizzle.png"
                    }else if(res.data.weather[0].main == "Mist"){
                        imagePath="/Images/mist.png"
                    }else{
                        imagePath="/Images/cloud.jpg"
                    }
                    console.log(res.data);
                    setdata({ ...data, celcius: res.data.main.temp, name: res.data.name, temp_min: res.data.main.temp_min,temp_max: res.data.main.temp_max, humidity: res.data.main.humidity , image:imagePath})
                    seterror('');
                })
                .catch(err => {
                    if(err.response.status == 404){
                        seterror("Invalid city name")
                    }else{
                        seterror('');
                    }
                    console.log(err)
                });
        }
    }
       let d=new Date();
       let date= d.getDate();
       let year=d.getFullYear();
       let month=d.toLocaleString("default",{month:'long'});
       let day=d.toLocaleString("default",{weekday:'long'});

    return (
        <>
            <div>
                <div className='container mt-4'>
                    <div className='row justify-content-center'>
                        <div className="col-md-6">
                            <div className="card text-white text-center border-0">
                                <img src="https://source.unsplash.com/600x650/?nature,water" className="card-img" alt="..." />
                                <div className="card-img-overlay">
                                        <div className="mb-2 width-75 mx-auto">
                                            <input type="text" placeholder="search city"  onChange={(e) => setname(e.target.value)} />
                                            <button >
                                               <img onClick={handleClick} alt="" src="https://icon-library.com/images/search-icon-png-transparent/search-icon-png-transparent-18.jpg" width={18} height={25} />
                                            </button>
                                        </div>
                                        <div className="error fw-bold" style={{color:'red'}}>
                                            <p>{error}</p>
                                        </div>
                                    <div className="bg-dark bg-opacity-50">
                                    <div className='row'>
                                        <h2 className="card-title">{data.name}</h2>
                                        <p className="card-text lead mb-0">{day}, {month} {date}, {year} </p>
                                        <hr />
                                        <img src={data.image} height={150} alt="" className='mb-0'/>
                                        <h1 className='fw-bolder mb-1'>{Math.round(data.celcius)} &deg;c</h1>
                                        
                                            <div className='col'>
                                                <p className='lead fw-bolder mb-0'>{data.humidity} %</p>
                                                <p className='lead fw-bolder mb-0'>Humidity</p>
                                            </div>
                                            <div className='col'>
                                                <p className='lead'>{Math.round(data.temp_min)} &deg;c | {Math.round(data.temp_max)} &deg;c</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Searchweather