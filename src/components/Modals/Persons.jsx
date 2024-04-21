import React from 'react'
import ReactDOM from 'react-dom'
export default function Persons({adults,children,infants,setConstantValue,setData,seatClass,adultDisable,childDisable,infantDisable}) {
 const classes=[
    {name:"Economy", selected:"no"},{name:"Business Class",selected:"no"},{name:"First Class",selected:"no"},{name:"Premium Economy",selected:"no"}
]
    classes.map((item)=>{
        if(item.name===seatClass){
            return item.selected="yes"
        }
        else{
            return item.selected="no";
        }   
    })
    //console.log(document.querySelector(".personbtn"))
  return  ReactDOM.createPortal(
    <div className="persons">
        <div className="personscard">
            <div className="personflex">
                <div className="showperson">
                    <div>Adults</div>
                    <div>(12+ years)</div>
                </div>
                <div className="addpeople">
                    <button className="personbtn" disabled={adultDisable} onClick={(e)=>setConstantValue(e,{type:"adults",action:"decrease"})}>-</button>
                    <div>{adults}</div>
                    <button className="personbtn" onClick={(e)=>setConstantValue(e,{type:"adults",action:"increase"})}>+</button>
                </div>
            </div>
            <div className="personflex">
                <div className="showperson">
                    <div>Children</div>
                    <div>(2-12 years)</div>
                </div>
                <div className="addpeople">
                    <button className="personbtn"  disabled={childDisable} onClick={(e)=>setConstantValue(e,{type:"children",action:"decrease"})}>-</button>
                    <div>{children}</div>
                    <button className="personbtn" onClick={(e)=>setConstantValue(e,{type:"children",action:"increase"})}>+</button>
                </div> 
            </div>
            <div className="personflex">
                <div className="showperson">
                    <div>Infants</div>
                    <div>(Below 2 years)</div>
                </div>
                <div className="addpeople">
                    <button className="personbtn" disabled={infantDisable} onClick={(e)=>setConstantValue(e,{type:"infant",action:"decrease"})}>-</button>
                    <div>{infants}</div>
                    <button className="personbtn" onClick={(e)=>setConstantValue(e,{type:"infant",action:"increase"})}>+</button>
                </div>
            </div>
        </div>
        <div className="personClassDiv">
            {
            classes.map(item=>(  
            
            <div className={item.selected==="yes"?"personClassBtn selected":"personClassBtn"} value={item.name} key={item.name} onClick={(e)=>setData(e)} >{item.name}</div>
            
            ))
            
            }
            
        </div> 

    </div>,document.getElementById('person')
  )
}
