import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';


const Signup=()=> {

    const [credentials, setCredentials] = useState({name:"", email: "", password: "" , cpassword:"" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
     const   {name,email,password}=credentials;
     

        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': "application/json",

          },
          body: JSON.stringify({name , email, password}),
        });

        const json = await response.json();
        console.log(json);

        if(json.success){
            localStorage.setItem('token',json.authtoken)
            console.log('Navigating to home page...');
            navigate("/");
            
            }
            else{
                alert('invailed credential')
            }
                
    
    
      };
    
      const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
      
  return (
    <div>
    <form onSubmit={handleSubmit}>
  <div className="mb-3" >


  <label htmlFor="name" className="form-label">Name</label>
  <input type="text" className="form-control" name="name" id="name" required onChange={onChange}/>
  
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" id="email" required  aria-describedby="emailHelp" onChange={onChange}/>
  </div>

  <div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  <input type="password" className="form-control" name="password" minLength={6}  id="password" required onChange={onChange}/>
</div>
<div className="mb-3">
<label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
<input type="password" className="form-control"  name="cpassword" minLength={6}  id="cpassword" required  onChange={onChange}/>
</div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      
    </div>
  )
}

export default Signup
