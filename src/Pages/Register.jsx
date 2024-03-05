import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TfiEmail, TfiLock, TfiUser } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { FaRegAddressBook } from "react-icons/fa6";
import axios from "axios";
import { message } from "antd";
import SimpleReactValidator from "simple-react-validator";


const Register = () => {
  const navigate = useNavigate();
  const [formVal, setFormVal] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });
  const [fromErrors,setFormErrors]=useState({})

  const FormValidation = new SimpleReactValidator();


  const handelChange = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
    setFormErrors({...fromErrors, [e.target.name]: null});
  };


  const handelRegister = (e) => {
    e.preventDefault();
    if (FormValidation.allValid()) {
      axios.post('http://localhost:8080/api/auth/register', {
        name: formVal?.name,
        email: formVal?.email,
        phone: formVal?.phone,
        password: formVal?.password,
        address:  formVal?.address
      })
      .then((result) =>{
       if (result.data.success == true) {
        message.success("Your Account Sucessfully Register")
        console.log(result.data.message);
        navigate("/");        
       }else{
        message.error(result?.data?.message)
       }
      })
      .catch((err)=>{
        message.error("Error")
        console.log(err);
      })
    } else {
      // document.getElementById("name").style.border = "1px solid red";
      // document.getElementById("phone").style.border = "1px solid red";
      // document.getElementById("email").style.border = "1px solid red";
      // document.getElementById("password").style.border = "1px solid red";
      // document.getElementById("address").style.border = "1px solid red";
      setFormErrors(FormValidation.errorMessages)
      
    }
  };
  return (
    <>
      <div class="flex h-screen absolute bg-white w-full lg:bg-gray-50 lg:gap-5 items-center">
        <div class="left h-full lg:w-1/3 lg:flex hidden">
          <figure class="">
            <img
              src="https://raw.githubusercontent.com/manoj-kushwah-8492821bb/sociala_frontend/main/public/Assets/login-bg-2.jpg"
              class="h-full"
              alt=""
            />
          </figure>
        </div>
        <section class="lg:w-2/3 w-full lg: sm:w-4/5 md:w-3/4 mx-auto lg:px-20">
          <div class="mb-5">
            <span class="flex text-center text-blue-500 text-3xl font-bold gap-2">
              <img
                src="https://github.com/manoj-kushwah-8492821bb/sociala_frontend/blob/main/public/favicon.png?raw=true"
                class="w-8 2xl:"
                alt=""
              />{" "}
              Sociala.
            </span>
          </div>

          <div class="right flex flex-col mx-auto lg:p-10 p-5 bg-white rounded lg:shadow">
            <h1 class="text-xl mb-5 uppercase font-bold gap-10">
              CREATE YOUR ACCOUNT
            </h1>

            <form onSubmit={handelRegister}>
              <div
                id="name"
                class=" border rounded flex items-center gap-3 w-full "
              >
                <label>
                  {" "}
                  <TfiUser className="text-gray-500 text-xl mx-2" />
                </label>
                <input
                  name="name"
                  type="text"
                  class="p-1 outline-none rounded flex items-center w-full "
                  placeholder="Name"
                  value={formVal?.name}
                  onChange={handelChange}
                />
              </div>
              {FormValidation.message("name", formVal?.name, 'required|alpha_space')}
              <p className="mb-2 text-red-500 font-medium">{fromErrors?.name}</p>

              <div
                id="address"
                class="border rounded flex items-center gap-3 w-full "
              >
                <label>
                  {" "}
                  <FaRegAddressBook className="text-gray-500 text-xl mx-2" />
                </label>
                <input
                  name="address"
                  value={formVal?.address}
                  onChange={handelChange}
                  type="text"
                  class="p-1 outline-none rounded flex items-center w-full "
                  placeholder="Address"
                />
              </div>
              {FormValidation.message("address", formVal?.address, 'required|alpha')}
              <p className="mb-2 text-red-500 font-medium">{fromErrors?.address}</p>

              <div
                id="phone"
                class=" mb- border rounded flex items-center gap-3 w-full "
              >
                <label>
                  {" "}
                  <FiPhone className="text-gray-500 text-xl mx-2" />
                </label>

                <input
                  name="phone"
                  value={formVal?.phone}
                  onChange={handelChange}
                  type="tel"
                  class="p-1 outline-none rounded flex items-center w-full "
                  placeholder="Phone No..." 
                />
              </div>
                 {FormValidation.message("phone", formVal?.phone, 'required|integer')}
              <p className="mb-2 text-red-500 font-medium">{fromErrors?.phone}</p>

              <div
                id="email"
                class=" border rounded flex items-center gap-3 w-full "
              >
                <label>
                  {" "}
                  <TfiEmail className="text-gray-500 text-xl mx-2" />
                </label>
                <input
                  name="email"
                  value={formVal?.email}
                  onChange={handelChange}
                  type="text"
                  class="p-1 outline-none rounded flex items-center  w-full "
                  placeholder="Email Address"
                />
              </div>
              {FormValidation.message("email", formVal?.email, 'required|email,')}
              <p className="mb-2 text-red-500 font-medium">{fromErrors?.email}</p>
    

              <div
                id="password"
                class="border rounded flex items-center gap-3 w-full "
              >
                <label>
                  {" "}
                  <TfiLock className="text-gray-500 text-xl mx-2" />
                </label>
                <input
                  name="password"
                  value={formVal?.password}
                  onChange={handelChange}
                  type="password"
                  class="p-1  outline-none rounded flex items-center w-full "
                  placeholder="Email Password"
                  // required
                />
              </div>
              {FormValidation.message("password", formVal?.password, 'required')}
              <p className="mb-2 text-red-500 font-medium">{fromErrors?.password}</p> 

              <div class="mb-5 border hover:bg-transparent hover:text-blue-500 bg-blue-500 text-white cursor-pointer border-blue-500 text-center rounded flex items-center gap-3">
                <input
                  type="submit"
                  class="w-full p-2 uppercase cursor-pointer text-center"
                  value="Register"
                />
              </div>
            </form>

            <div class="flex items-center gap-1.5">
              <span class="text-gray-500">Already have an account ?</span>

              <Link to="/">
                <span class="text-blue-500 cursor-pointer font-bold hover:underline">
                  Login
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
