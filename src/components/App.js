import "../styles/App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Flights from "./Flights/Flights";
import Layout from "./Layout";
import Hotels from "./Hotels";
import MyTrips from "./MyTrips";
import Offers from "./Offers"
import MyStore from "./assets/Context";
import {useState} from 'react'
import Result from "./Flights/Results/Result";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
function App() {
  const [filteredData, setFilteredData]=useState("")
  return (
  
  <MyStore.Provider value={{filteredData,setFilteredData}}>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}> 
            <Route index element={<Flights />}/>
            <Route path="/hotels" element={<Hotels/>}/>
            <Route path="/mytrips" element={<MyTrips/>}/>
          </Route>
          <Route path="/flights/results" element={<Result/>}/>
          <Route path="/offers" element={
          <Offers/>}/>
        </Routes>  
      </BrowserRouter>
    </div>
    </LocalizationProvider>
  </MyStore.Provider>
 
  )
}

export default App;
