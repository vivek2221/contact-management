

function Input({inputName,setVal,val,error}){

    return (
         <div style={{position:'relative'}}>
                  <input  className="inputfieldloginpage" name={inputName} id={inputName} placeholder={inputName} value={val} onChange={(e)=>{
                   setVal((prev)=>({...prev,[inputName]:e.target.value}))
                  }}></input>
                  <p style={{padding:0,position:'absolute',top:'50px',left:'10px',color:'red',margin:'3px 0'}}>
                    {error}
                  </p>
        </div>
    )
}
export default Input