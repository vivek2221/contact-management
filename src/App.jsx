import { useEffect, useState } from "react"
import EachContact from "./EachContact"
import NewContactAdd from "./newContactAdd"
import { useLocation } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

function App(){
    const {userName}=useLocation().state
    const [fav,setFav]=useState(false)
    const [top,setTop]=useState(0)
    const [dataOfWhich,setDataOfWhich]=useState({name:'',email:'',num:'',info:''})
    const [left,setLeft]=useState(0)
    const [visib,setVisib]=useState(false)
    const notify = () => toast('Contact already saved ');
    const firstletterOfUser=userName[0].toUpperCase()
    const [contacts,setContacts]=useState([])
       const [vis,setVis]=useState(false)
       const [arr,setArr]=useState([])
       const [change,setChange]=useState(0)
       let disSearch=[]
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/getContact`,{
            method:"GET",
            credentials:'include'
        }).then(data=>data.json())
        .then((data)=>{
            const temp=[]
            data.data.forEach((ele)=>{
                const firstLetter=ele.name[0].toUpperCase()
                temp.push({firstLetter,name:ele.name,email:ele.email,num:ele.num,info:ele.info})
            })
            setArr(temp)
            setContacts(temp)
        })
      
    },[change])
    return (<>
        <Toaster />
        <div id="mainDiv" onClick={(e)=>{
            if(visib===true){
                setVisib(false)
            }
           
        }}>
        <div id='topSearchDiv'>
            <div id="logoDiv">Contact</div>
            <div id='searchDiv'><div style={{ width: '90%',height: '60%'}}>
                <input id='searchContact' placeholder="search" onChange={(e)=>{
                    
                    disSearch=arr.filter(({firstLetter,name,email,info,num})=>{
                        console.log(name)
                        return name.includes(e.target.value)
                    })
                    console.log(arr,disSearch)
                    setContacts(disSearch)
                
                }}></input></div></div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:'40px',height:'40px',borderRadius:'50%',backgroundColor:'red',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div>{firstletterOfUser}</div>
                    </div>
                
            </div>
        </div>
        <div id='content'>
            <div id='sideNavBar'>
                <div style={{width:'80%',height:'5%',marginTop:'10px'}}>
                    <button style={{cursor:'pointer',backgroundColor:'#7298ff',border:'none',width:'100%',height:'100%',borderRadius:'5px'}} onClick={()=>{
                        setVis(true)
                    }}>New Contact</button>
                    </div>
                    <div style={{width:'80%',height:'5%',fontSize:'30px',textAlign:'center'}}>Categories</div>
                    <div style={{marginTop:'10px',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:`${fav?'#c3c5cbff':'orange'}`,border:'none',width:'80%',height:'5%',borderRadius:'5px',cursor:'pointer'}} onClick={(e)=>{
        fetch(`${import.meta.env.VITE_API_URL}/getContact`,{
            method:"GET",
            credentials:'include'
        }).then(data=>data.json())
        .then((data)=>{
            const temp=[]
            data.data.forEach((ele)=>{
                const firstLetter=ele.name[0].toUpperCase()
                temp.push({firstLetter,name:ele.name,email:ele.email,num:ele.num,info:ele.info})
            })
            setArr(temp)
            setContacts(temp)
        })
          setFav(false)
              }}> &nbsp; All Contacts</div>
              <div style={{marginTop:'10px',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:`${fav?'orange':'#c3c5cbff'}`,border:'none',width:'80%',height:'5%',borderRadius:'5px',cursor:'pointer'}} onClick={(e)=>{
        fetch(`${import.meta.env.VITE_API_URL}/getFavorite`,{
            method:"GET",
            credentials:'include'
        }).then(data=>data.json())
        .then((data)=>{
            const temp=[]
            data.forEach((ele)=>{
                const firstLetter=ele.name[0].toUpperCase()
                temp.push({firstLetter,name:ele.name,email:ele.email,num:ele.num,info:ele.info})
            })
            // console.log(temp)
            setContacts(temp)
            setFav(true)
        })
          
              }}><i className="ri-star-s-line"></i> &nbsp; Favorite</div>
            </div>
            <div id='eachContacts'>
              {contacts.map(({firstLetter,name,email,info,num},index)=>{
               return  <EachContact fav={fav} setDataOfWhich={setDataOfWhich} visib={visib} setLeft={setLeft} setTop={setTop} setChange={setChange} setVisib={setVisib} email={email} image={firstLetter} info={info} name={name} num={num} key={index}/>
              })}
            </div>
        </div>
        <NewContactAdd notify={notify} setVis={setVis} vis={vis} setChange={setChange}/>
        </div>
        <div id='editDiv' style={{display:`${visib?'block':'none'}`,top:`${top}px`,left:`${left-115}px`}} onClick={(e)=>{
                    setVisib(false)
                }}>
                    <div style={{borderBottom:'1px solid'}} onClick={(e)=>{
                        fetch(`${import.meta.env.VITE_API_URL}/deleteContact`,{
                          method:'DELETE',
                          headers:{
                            'content-type':'application/json'
                          },
                          credentials:'include',
                          body:JSON.stringify({name:dataOfWhich.name,email:dataOfWhich.email,num:dataOfWhich.num})
                        })
                        .then(data=>data.json())
                        .then((data)=>{
                            setChange((prev)=>prev+1)
                        })
                    }}>Delete</div>
                    <div onClick={(e)=>{
                        fetch(`${import.meta.env.VITE_API_URL}/favorite`,{
                          method:'POST',
                          headers:{
                            'content-type':'application/json'
                          },
                          credentials:'include',
                          body:JSON.stringify({name:dataOfWhich.name,email:dataOfWhich.email,num:dataOfWhich.num,info:dataOfWhich.info})
                        })
                        .then(data=>data.json())
                        .then((data)=>{
                            setChange((prev)=>prev+1)
                        })
                    }}>Favorite</div>
                </div>
        </>
    )
}
export default App