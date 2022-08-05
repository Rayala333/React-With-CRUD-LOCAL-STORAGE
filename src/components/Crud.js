import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';

// const mydata = ()=>{
//   const fanialData = localStorage.getItem("userData");

//   if(fanialData){
//     return JSON.parse(fanialData)
//   }else{
//     return []
//   }
// }

const Crud = () => {

  const [data, setData] = useState({
    username:"",
    password:"",
    email:"",
    phonenumber:""
  });

  const [local, setLocal] = useState([]);

  console.log(local)
  const [update,setUpdate] = useState(true)
  const [EditItem,setEditItem] = useState(null)

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: [event.target.value] });
  };
  
  const submitHandler = (event) => {
   
    event.preventDefault();
    try{

      if(!data.username && !data.password && !data.email && !data.phonenumber){
        alert("No Data")
      }
      else if (data && !update){
        setLocal(
          local.map((element,index)=>{
            if(index === EditItem){
              // return {...element, username:data.username,
              //                     password:data.password,
              //                     email:data.email,
              //                     phonenumber:data.phonenumber}
              return {...element , username:data.username,
                                    password:data.password,
                                    email:data.email,
                                    phonenumber:data.phonenumber}
            }
            return element
          })
        )
        setUpdate(true)
        setData({
          username:'',
          password:"",
          email:"",
          phonenumber:""
         })
      }
      else{
      // let newdata = {id:new Date().getTime().toString(),
      //               username:data.username,
      //               password:data.password,
      //               email:data.email,
      //               phonenumber:data.phonenumber}
      
      setLocal([...local,data])
      setData({
        username:'',
        password:"",
        email:"",
        phonenumber:""
       })
     }
      
    }catch(err){
      console.log(err.message)
    }
     
  };

  useEffect(()=>{

  const mydata = ()=>{
  const fanialData = localStorage.getItem("userData");
      if(fanialData){
        setLocal(JSON.parse(fanialData))
      }else{
        setLocal([])
      }
    }
    mydata()

  },[])
  

  useEffect(()=>{

    localStorage.setItem('userData',JSON.stringify(local))
    
  },[local])

  
  const deleteHandleer =(index)=>{
    alert("are yousure want to delete")
    const filterData = local.filter((element)=>{
      return local.indexOf(element) !== index
      // return id !== element.id
    })
    setLocal(filterData)
  }



  const editHandker = (index)=>{
    // console.log(user)
    // const edit = local
    // console.log(edit[index],"edit")
    
    // setData(
    //   {
    //     key:index,
    //     username: edit[index].username,
    //     password: edit[index].password,
    //     email: edit[index].email,
    //     phonenumber:edit[index].phonenumber,
    //   }
      
    // )
    let newedit = local.find((element)=>{
      return local.indexOf(element) === index
      // return element.id === id
    })
    // console.log(newedit,"Edit")
    
    setData(
      {
        username:newedit.username,
        password:newedit.password,
        email:newedit.email,
        phonenumber:newedit.phonenumber,
      }
    )

    setEditItem(index)
    setUpdate(false)
  }

  

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "1rem",
        }}
        onSubmit={submitHandler}
      >
        <TextField id="username" label="Enter Username" 
                                  variant="outlined"
                                  name="username"
                                  value={data.username}
                                  onChange={changeHandler} sx={{margin:"1rem"}}/>
        
        <TextField id="password" label="Enter Password" 
                                  variant="outlined"
                                  name="password"
                                  value={data.password}
                                  onChange={changeHandler} sx={{margin:"1rem"}}/>
        
        <TextField id="email" label="Enter Email" 
                                  variant="outlined"
                                  name="email"
                                  value={data.email}
                                  onChange={changeHandler} sx={{margin:"1rem"}}/>
        
        <TextField id="phonenumber" label="Enter Phonenumber" 
                                  variant="outlined"
                                  name="phonenumber"
                                  value={data.phonenumber}
                                  onChange={changeHandler} sx={{margin:"1rem"}}/>
        
        {update ? <button>Submit</button>:<button>Update</button>}
        
      </form>


{local.length <= 0 ? <h1>Enter User Details</h1>:
      <table>
        <thead>
          <tr>
          <th>S.No</th>
            <th>username</th>
            <th>password</th>
            <th>email</th>
            <th>phonenumber</th>
            <th colSpan={2}>actons</th>
          </tr>
        </thead>
        <tbody>
        {
          local.map((user,index)=>(
            <tr key={index}>
              <td>{index}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td onClick={()=>editHandker(index)}>Edit</td>
              <td  onClick={()=>deleteHandleer(index)}>Delete</td>
            </tr>
          ))
        }
        <tr><td colSpan={7}>
        <button onClick={()=>setLocal([])} className="button" >RemoveAll</button></td></tr>
        </tbody>
      </table>}
    </>
  );
};

export default Crud;
