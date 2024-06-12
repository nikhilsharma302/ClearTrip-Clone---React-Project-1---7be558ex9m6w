import "../../styles/App.css"
export default function CityList({cityArray,setselectcity,setShowCityList}) {
    function handleSelect(e){
        setselectcity(e.target.innerText)
        setShowCityList(false)
    }
    return(
        <ul id="cityList" onClick={handleSelect}>
        {
            cityArray.map(city=>
            <li key={city.cityState}>
                {city.cityState}
            </li>
            )
        }
        </ul>        
    )
}
