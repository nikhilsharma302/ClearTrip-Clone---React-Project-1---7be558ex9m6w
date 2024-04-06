import React,{useEffect} from 'react'

export default function Card({flightarr}) {
    
    const flightId=flightarr.map(item=>(item._id))
    let arr=[];
    async function callingdetails(i){
        try{
            const resp=await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightId[i]}`,{headers:{
                projectId:"f104bi07c490"
            }})
            if(!resp.ok){
                throw new Error("Unable to fetch flight details at index",i)
            }
            else{
                const response=await resp.json();
                 arr=[...arr,response.data]
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        for(let i=0;i<flightId.length;i++)
            callingdetails(i)
    },[flightarr])
  return (
        <table style={{display:"flex", flexDirection:"column",gap:"5px"}}>
            <thead>
                <tr>

                </tr>
            </thead>
        {
        flightarr.map(item=>(
        <div key={item._id} style={{display:"flex", border:"1px solid black",justifyContent:"space-between",alignItems:"center",width:"80%",height:"10vh"}}>
            <div>{item.source}</div>
            <div>{item.destination}</div>
            <div>{item.departureTime}</div>
            <div>{item.arrivalTime}</div>
            <div>{item.duration}</div>
            <div>{item.ticketPrice}</div>
        </div>
    ))
    }
      </table>
  )

}
