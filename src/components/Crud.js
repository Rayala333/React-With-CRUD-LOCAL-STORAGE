import React, { useState, useEffect } from "react";

const Crud = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    phonenumber: "",
  });

  const [local, setLocal] = useState([]);

  console.log(local);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: [event.target.value] });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(data);
    try {
      let userInputData = localStorage.getItem("userData");
      setValue(userInputData);
      //   userInputData.push(data);
      if (userInputData) {
        return JSON.parse(userInputData);
        // return userInputData.push(data);
      } else {
        localStorage.setItem("userData", JSON.stringify(data));
      }
    } catch (error) {
      return error;
    }
    const setValue = (userInputData) => {
      try {
        localStorage.setItem("userData", JSON.stringify(userInputData));
        console.log(userInputData, "SetValues");
      } catch (error) {
        return error;
      }
    };
  };

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
          onChange={changeHandler}
        ></input>
        <label htmlFor="password">Enter Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={changeHandler}
        ></input>
        <label htmlFor="email">Enter Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={changeHandler}
        ></input>
        <label htmlFor="phonenumber">Enter Phonenumber</label>
        <input
          type="number"
          name="phonenumber"
          id="phonenumber"
          onChange={changeHandler}
        ></input>
        <button>Submit</button>
      </form>

      <table style={{ width: "70%", border: "1px solid black" }}>
        <tr>
          <th>Username</th>
          <th>password</th>
          <th>email</th>
          <th>phonenumber</th>
          <th>Actions</th>
        </tr>
        {local.length > 0 ? (
          <h1> "Greater than zero" </h1>
        ) : (
          <h1> "less than zero" </h1>
        )}
        {/* {local.length !== 0

          ? local.map((ele, ind) => {
              return (
                <tr>
                  <td>{ele.username}</td>
                  <td>{ele.password}</td>
                  <td>{ele.email}</td>
                  <td>{ele.phonenumber}</td>
                  <td>
                    <button onClick={editHandler}>Edit</button>
                  </td>
                  <td>
                    <button onClick={deleteHandler(ind)}>Delete</button>
                  </td>
                </tr>
              );
            })
          : ""} */}
      </table>
    </>
  );
};

export default Crud;
