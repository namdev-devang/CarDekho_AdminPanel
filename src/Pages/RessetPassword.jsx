import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TfiLock } from "react-icons/tfi";
import axios from "axios";
import { message } from "antd";
import SimpleReactValidator from "simple-react-validator";

const Reset = () => {
  const navigate = useNavigate();
  const {user_id} = useParams()
  const [formVal, setFormVal] = useState({
    password: "",
  });
  const [fromErrors,setFormErrors]=useState({})
   
  const FormValidation = new SimpleReactValidator();

  const handelChange = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
    setFormErrors({ ...fromErrors, [e.target.name]: null });
  };
  
  const handelLogin = (e) => {
    e.preventDefault();
    if (FormValidation.allValid()) {
        axios
          .post("http://localhost:8080/api/auth/reset", {
            password: formVal.password,
            user_id : user_id,
          })
          .then((result) => {
            if(result?.data?.success == true){
              // message.success(res?.data?.message);
              // message.success('')
              message.success('Password Successfully Updated.')
              navigate("/");
            }else{
              message.error(res?.data?.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setFormErrors(FormValidation.errorMessages);
      }
  }
  return (
    <>
      <div className="flex h-screen absolute bg-white w-full lg:bg-gray-50 lg:gap-5 items-center">
        <div className="left h-full lg:w-1/3 lg:flex hidden">
          <figure className="">
            <img
              src="https://github.com/manoj-kushwah-8492821bb/sociala_frontend/blob/main/public/Assets/login-bg.jpg?raw=true"
              className="h-full"
              alt=""
            />
          </figure>
        </div>
        <section className="lg:w-2/3 w-full lg: sm:w-4/5 md:w-3/4 mx-auto lg:px-20">
          <div className="mb-5">
            <span className="flex text-center text-blue-500 text-3xl font-bold gap-2">
              <img
                src="https://github.com/manoj-kushwah-8492821bb/sociala_frontend/blob/main/public/favicon.png?raw=true"
                className="w-8 2xl:"
                alt=""
              />{" "}
              Sociala.
            </span>
          </div>

          <div className="right flex flex-col mx-auto lg:p-10 p-5 bg-white rounded lg:shadow">
            <h1 className="text-xl mb-5 uppercase font-bold gap-10">
            Reset Password 
            </h1>

            <form onSubmit={handelLogin}>
              <div
                id="password"
                className=" mb-1 border rounded flex items-center gap-3 w-full "
              >
                <label>
                  {" "}
                  <TfiLock className="text-gray-500 text-xl mx-2" />
                </label>
                <input
                  type="password"
                  name="password"
                  className="p-1 outline-none rounded flex items-center  w-full "
                  placeholder="Reset password"
                  value={formVal?.password}
                  onChange={handelChange}
                />
              </div>
                {FormValidation.message("password", formVal?.password, "required|password")}
                <p className="mb-6 text-red-500">{fromErrors?.password}</p>
 
              
              <div className="mb-5 border hover:bg-transparent font-bold hover:text-blue-500 bg-blue-500 text-white cursor-pointer border-blue-500 text-center rounded flex items-center gap-3">
                <input
                  type="submit"
                  className="w-full p-2 uppercase cursor-pointer text-center"
                  value="Sumbit"
                />
              </div>
            </form>

            {/* <div className="flex items-center gap-1.5">
              <span className="text-gray-500">Don't have an account? </span>

              <Link to="/register">
                <span className="text-blue-500 font-bold cursor-pointer hover:underline ">
                  LOGIN
                </span>
              </Link>
            </div> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default Reset;
