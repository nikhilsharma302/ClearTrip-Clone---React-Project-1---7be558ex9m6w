import "../styles/App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Flights from "./Flights";
import Layout from "./Layout";
import Hotels from "./Hotels";
import MyTrips from "./MyTrips";
function App() {
  return <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Flights/>}/>
          <Route path="/hotels" element={<Hotels/>}/>
          <Route path="/mytrips" element={<MyTrips/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  </div>
}

export default App;
