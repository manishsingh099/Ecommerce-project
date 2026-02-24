import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const handleRegister=async()=>{
    await axios.post("http://localhost:5000/api/auth/register",{
      name,email,password
    });
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div style={{padding:"20px"}}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e=>setName(e.target.value)}/><br/>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/><br/>
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/><br/>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;