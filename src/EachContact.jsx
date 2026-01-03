


function EachContact({fav,setDataOfWhich,image,name,email,num,info,setVisib,setLeft,setTop}){
    
    
    

    return (
        <>
        <div className="contactBox">
            <div className="imageContact">
                {image}
            </div>
            <div className="nameContact">{name}</div>
            <div className="emailContact">{email}</div>
            <div className="numberContact">{num}</div>
            <div className="infoContact">{info}</div>
            <div className="moreIconContact" style={{display:`${fav?'none':"block"}`}} onClick={(e)=>{
                  setVisib(true)
                  setLeft(e.clientX)
                  setTop(e.clientY)
                  setDataOfWhich((prev)=>({...prev,name,email,num,info}))
            }}>
                <img src="more.png" alt='more' style={{width:'100%',height:'100%',cursor:'pointer'}}></img>
                </div>
                
        </div>
       
                </>
    )
}
export default EachContact