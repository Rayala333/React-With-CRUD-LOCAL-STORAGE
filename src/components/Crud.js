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

  const [data, setData] = useState({
    id:new Date().getTime().toString(),
    username: "",
    password: "",
    email: "",
    phonenumber: "",
  });

  const [local, setLocal] = useState(mydata());

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: [event.target.value] });
  };

  const submitHandler = (event) => {
   
    event.preventDefault();

     if(data === ""){
      alert("No Data")
     }else{
      setLocal([...local,data])
      
     }
     setData({
    id:new Date().getTime().toString(),
    username: "",
    password: "",
    email: "",
    phonenumber: "",
     })
     
  };
  

  useEffect(()=>{

    localStorage.setItem('userData',JSON.stringify(local))
    
  },[local])

  
  const deleteHandleer =(id)=>{
    alert("are yousure want to delete")
    const filterData = local.filter((element)=>{
      // return local.indexOf(element) !== index
      return id !== element.id
    })

    console.log(filterData)
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
      return id === element.id
    })
    console.log(newedit)
    
    setData(
      {
        username:newedit.username,
        password:newedit.password,
        email:newedit.email,
        phonenumber:newedit.phonenumber,
      }
    )
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
        <button>Submit</button>
      </form>
{local.length <= 0 ? <h1>Enter User Details</h1>:
      <table>
        <thead>
          <tr>
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
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td onClick={()=>editHandker(user.id)}>Edit</td>
              <td  onClick={()=>deleteHandleer(user.id)}>Delete</td>
            </tr>
          ))
        }
        </tbody>
        <button onClick={()=>setLocal([])} >RemoveAll</button>
        
      </table>}
    </>
  );
};

export default Crud;
