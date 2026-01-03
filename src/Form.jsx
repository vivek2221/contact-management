import { useState } from "react"
import Input from "./Input.jsx"
import { useNavigate } from "react-router-dom"

function Form(){
    const navigate=useNavigate()
    const [values,setValues]=useState({name:'',email:'',passwd:''})
    const validations={name:[{required:true,message:'enter name'},{minLength:3,message:'it should be grater than 3'}],email:[{required:true,message:'enter the email'},{regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:'enter a valid email'}],passwd:[{required:true,message:'enter the passwd'},{minLength:4,message:'passwd should be greater than 3'}]}
    const [errors,setErrors]=useState({})
    const errorCheck=(values,setErrors)=>{
        const err={}
    for(let keys in values){
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
        })
    }
    setErrors({...err})
    return err
    }
    return (
        <div id='mainDivLoginPage'>
            <div>
                <img src='contactLogo.png' style={{width:'15vw',marginRight:'5vw'}}></img></div>
        <div id='loginDiv'>
            
            <form>
                <Input error={errors.name} val={values.name} setVal={setValues} inputName='name' />
                <Input error={errors.email} val={values.email} setVal={setValues} inputName='email'/>
                <Input error={errors.passwd} val={values.passwd} setVal={setValues} inputName='passwd'/>
                
                    <button id='button' type="submit" onClick={(e)=>{
                    e.preventDefault()
                    const retError=errorCheck(values,setErrors)
                    console.log(retError)
                    if(Object.keys(retError).length){
                        return 
                    }
                    fetch(`${import.meta.env.VITE_API_URL}/login`,{
                        method:'POST',
                        headers:{
                            'content-type':"application/json"
                        },
                        credentials:'include',
                        body:JSON.stringify(values)
                    })
                    .then(data=>data.json())
                    .then((data)=>{
                        console.log(data)
                        if(data.mess==='next'){
                            navigate('/app',{state:{Id:data.data,userName:values.name}})
                        }
                        
                    })
                }}>enter</button>
                
            </form>
        </div>
        </div>
    )
}
export default Form