import React, { useState, useEffect } from "react";


const mydata = ()=>{
  const fanialData = localStorage.getItem("userData");

  if(fanialData){
    return JSON.parse(fanialData)
  }else{
    return []
  }
}

const Crud = () => {

  const [data, setData] = useState('');

  const [local, setLocal] = useState(mydata());
  const [update,setUpdate] = useState(true)
  const [EditItem,setEditItem] = useState(null)

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: [event.target.value] });
  };
  
  const submitHandler = (event) => {
   
    event.preventDefault();
    try{

      if(!data){
        alert("No Data")
      }
      else if (data){
        setLocal(
          local.map((element)=>{
            if(element.id === EditItem){
              console.log("inside")
              return {...element, username:data.username,
                                  password:data.password,
                                  email:data.email,
                                  phonenumber:data.phonenumber}
            }
            return element
          })
        )
      }
      else{
      let newdata = {id:new Date().getTime().toString(),
                    username:data.username,
                    password:data.password,
                    email:data.email,
                    phonenumber:data.phonenumber}
      
      setLocal([...local,newdata])
     }
      
    }catch(err){
      console.log(err.message)
    }
    
     setData({
      username:'',
      password:"",
      email:"",
      phonenumber:""
     })
    
     setUpdate(true)
     
  };
  

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



  const editHandker = (id)=>{
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
      // return local.indexOf(element) === index
      return element.id === id
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

    setEditItem(id)
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
        }}
        onSubmit={submitHandler}
      >
        <label htmlFor="username">Enter Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={data.username}
          onChange={changeHandler}
        ></input>
        <label htmlFor="password">Enter Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={changeHandler}
        ></input>
        <label htmlFor="email">Enter Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={changeHandler}
        ></input>
        <label htmlFor="phonenumber">Enter Phonenumber</label>
        <input
          type="number"
          name="phonenumber"
          value={data.phonenumber}
          id="phonenumber"
          onChange={changeHandler}
        ></input>
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
              <td onClick={()=>editHandker(user.id)}>Edit</td>
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
