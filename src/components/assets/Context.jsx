import { createContext } from "react";
 const MyStore=createContext();
export default MyStore;
// function Context({props}){
//     const [filteredData, setFilteredData]=useState("FLIGHTS")
//     return(
//         <MyStore.Provider value={{filteredData:filteredData,setFilteredData:setFilteredData}}>
//             {props.children}
//         </MyStore.Provider>
//     )
// }

