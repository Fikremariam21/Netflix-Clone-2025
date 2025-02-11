// import React, {useState, useEffect} from 'react'
// import styles from './Login.module.css'
// import logo from '../../Asset/Images/Netflix-logo.png'

// import { Link } from 'react-router-dom'
// function Login() {
//   const[ signState, setSignState] = useState("Sign In")

//   return (
//     <div className= {styles.login}>
      
//       <div className={styles.logo}> <Link to='/'> <img src={logo} alt="Netflix-logo" width={"100"} /> </Link>
//       </div>
//       <div className={styles.login_form}>
//         <h1> {signState} </h1>
//         <form>
//           {signState==="Sign Up"?<input type="text" placeholder='Your name' />: <></>}
//           {/* <input type="text"placeholder='Your name'/> */}
//           <input type="email"placeholder='Email'/>
//           <input type="password"placeholder='Password'/>
//           <button>{signState}</button>
//           <div className={styles.form_help}> 
//             <div className={styles.remember}> 
//               <input type="checkbox"/>
//               <label htmlFor="">Remember Me</label>
//               <p>Need Help?</p> 
//             </div> 
//           </div>
//         </form>
//         <div className={styles.form_switch}> 
//           {signState==="Sign In"?
//                     <p> New to Netflix? <span onClick={()=>{setSignState("Sign Up")}} >Sign Up Now </span ></p>:<p> Already have Account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now </span></p>
//           }
          
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login






import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../Asset/Images/Netflix-logo.png';

function Login() {
  const [signState, setSignState] = useState("Sign In");
  const navigate = useNavigate(); // Hook to navigate

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Simulate authentication (replace with actual logic)
    if (signState === "Sign In") {
      // Here, you can add authentication logic (e.g., check user credentials)
      navigate('/'); // Redirect to home page after sign-in
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        <Link to='/'>
          <img src={logo} alt="Netflix-logo" width={"100"} />
        </Link>
      </div>
      <div className={styles.login_form}>
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit}>  {/* Add onSubmit event */}
          {signState === "Sign Up" ? <input type="text" placeholder='Your name' /> : null}
          <input type="email" placeholder='Email' required />
          <input type="password" placeholder='Password' required />
          <button type="submit">{signState}</button>  {/* Submit button */}
          <div className={styles.form_help}>
            <div className={styles.remember}>
              <input type="checkbox" />
              <label>Remember Me</label>
              <p>Need Help?</p>
            </div>
          </div>
        </form>
        <div className={styles.form_switch}>
          {signState === "Sign In" ? (
            <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>
          ) : (
            <p>Already have an Account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

