import { useState } from "react"
import Input from "./Input"


function NewContactAdd({notify,vis,setVis,setChange}){
       const [values,setValues]=useState({Name:'',Email:'',Contact_Number:'',Info:''})
           const validations={Name:[{required:true,message:'enter name'},{minLength:3,message:'it should be grater than 3'}],Email:[{required:true,message:'enter the email'},{regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:'enter a valid email'}],Contact_Number:[{required:true,message:'enter the contactNo.'},{numCheck:true,message:'enter numbers only'},{min:10,message:'number must be of 10 digits'}]}
           const [errors,setErrors]=useState({})
           const errorCheck=(values,setErrors)=>{
        const err={}
    for(let keys in values){
        if (!validations[keys]) continue
        validations[keys].some((ele)=>{
            
            if(values[keys]==='' && ele.required){
                err[keys]=ele.message
                return true
            }
            if(ele.regex && ele.regex.test(values[keys])===false){
                err[keys]=ele.message
                return true
            }
            if(ele.minLength && ele.minLength>values[keys].length){
                err[keys]=ele.message
                return true
            }
            if(ele.numCheck){
                const isNum=Number(values[keys])
                if(Number.isNaN(isNum)===true){
                    err[keys]=ele.message
                    return true
                }
            }
            if(ele.min && ele.min>values[keys].length){
                err[keys]=ele.message
                return true
            }
        })
    }
    setErrors({...err})
    return err
    }
    return (
        <div id='newContactAddDivMain' style={{display:`${vis?'block':'none'}`,zIndex:100,position:'absolute',top:'0',left:'0'}} onClick={(e)=>{
            
            setVis(false)
        }}>
            <form  onClick={(e)=>{
                e.preventDefault()
             e.stopPropagation()
            }}>
                
                 <div id='formForAddingContact'>
               
                <Input inputName='Name' val={values.Name} setVal={setValues} error={errors.Name} />
                <Input inputName='Email' val={values.Email} setVal={setValues} error={errors.Email}/>
                <Input inputName='Contact_Number' val={values.Contact_Number} setVal={setValues} error={errors.Contact_Number}/>
                <Input inputName='Info' val={values.Info} setVal={setValues} />
               <div>
                <button className="contactaddbtn" onClick={(e)=>{
                    e.preventDefault()
                    const retError=errorCheck(values,setErrors)
                    if(Object.keys(retError).length){
                        return 
                    }
                    
                    fetch(`${import.meta.env.VITE_API_URL}/addContact`,{
                        method:'POST',
                        headers:{
                            'content-type':'application/json'
                        },
                        credentials:'include'
                        ,
                        body:JSON.stringify({values})
                    })
                    .then((data)=>(data.json()))
                    .then((data)=>{
                        setVis(false)
                        setChange((prev)=>(prev+1))
                        if(data.mess==='contact Exists'){
                          notify()
                          
                        }
                        
                    })
                }}>Add</button>
               </div>
               </div>
            </form>
            </div>
        
    )
}
export default NewContactAdd