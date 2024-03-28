import React from 'react'

export default function Persons({adults,children,infants,setConstantValue}) {

  return (
    <div className="person">
        <div className="personflex">
            <div class="showperson">
                <div>Adults</div>
                <div>(12+ years)</div>
            </div>
            <div className="addpeople">
                <button className="personbtn" onClick={()=>setConstantValue({type:"adults",action:"decrease"})}>-</button>
                <div>{adults}</div>
                <button className="personbtn" onClick={()=>setConstantValue({type:"adults",action:"increase"})}>+</button>
            </div>
        </div>
        <div className="personflex">
            <div class="showperson">
                <div>Children</div>
                <div>(2-12 years)</div>
            </div>
            <div className="addpeople">
                <button className="personbtn" onClick={()=>setConstantValue({type:"children",action:"decrease"})}>-</button>
                <div>{children}</div>
                <button className="personbtn" onClick={()=>setConstantValue({type:"children",action:"increase"})}>+</button>
            </div> 
        </div>
        <div className="personflex">
            <div class="showperson">
                <div>Infants</div>
                <div>(Below 2 years)</div>
            </div>
            <div className="addpeople">
                <button className="personbtn" onClick={()=>setConstantValue({type:"infant",action:"decrease"})}>-</button>
                <div>{infants}</div>
                <button className="personbtn" onClick={()=>setConstantValue({type:"infant",action:"increase"})}>+</button>
            </div>
        </div>
              
    </div>
  )
}
