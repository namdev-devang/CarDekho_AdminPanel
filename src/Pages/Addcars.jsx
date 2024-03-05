import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import SimpleReactValidator from "simple-react-validator";



const Addcars = (props) => {
  const [loading,setloading]=useState(false);
  const [FormVal, setFormVal] = useState({
    ownerName: "",
    ownerPhone: "",
    ownerAddress: "",
    carNumber: "",
    company: "",
    model: "",
  });
  const [fromErrors,setFormErrors]=useState({})
  const FormValidation = new SimpleReactValidator();

  const { handelPopUp } = props;

  const handelChange = (e) => {
    setFormVal({ ...FormVal, [e.target.name]: e.target.value });
    setFormErrors({ ...fromErrors, [e.target.name]: null });
  };

  const handelSumbit = (e) => {
    e.preventDefault();
    if (FormValidation.allValid()) {
      const data = {
        ownerName: FormVal.ownerName,
        ownerPhone: FormVal.ownerPhone,
        ownerAddress: FormVal.ownerAddress,
        carNumber: FormVal.carNumber,
        company: FormVal.company,
        model: FormVal.model,
      };
      const token = JSON.parse(localStorage.getItem("token"));
      setloading(true)
      axios({
        url: "http://localhost:8080/api/car/add",
        method: "post",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          message.success("Your Car Add Sucessfully");
          props.load();
          handelPopUp();
          setloading(false)
        })
        .catch((err) => {
          message.error("Your Car Data not Added");
          
          console.log(err);
        });
    } else {
      setFormErrors(FormValidation.errorMessages)
      // message.error("Pls fill All Fileds");
    }
  };

  if (loading) {
    return(
      <>
         <h1 className="text-3xl text-center my-48">Loading...</h1>
      </>
    )
    
  }

  return (
    <>
      <div className="bg-[rgba(196,201,255,0.4)] flex justify-center items-center absolute top-[-85px] left-0  z-50 w-full h-full overflow-y-auto pt-10">
        <div className="md:w-1/3 w-full m-2 p-3 rounded-md bg-[#fffffa]  border-2 border-gray-500">
          <h1 className="flex justify-end" onClick={handelPopUp}>
            <IoCloseSharp className="text-xl mb-2 cursor-pointer" />
          </h1>
          <h1 className="text-center text-2xl  font-bold text-black ">
            Add Car's form
          </h1>

          <section class=" px-4 mx-auto bg-white rounded-md  text-black">
            <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white ">
              Account settings
            </h2>

            <form onSubmit={handelSumbit}>
              <div class="grid lg:grid-cols-1 gap-6 lg:mx-10">
                <div>
                  <input
                    id=""
                    type="text"
                    name="ownerName"
                    placeholder="Owner_Name"
                    value={FormVal?.ownerName}
                    onChange={handelChange}
                    class="block w-full shadow-sm px-4  text-gray-700 bg-white outline-none border-b-2 border-blue-200 rounded-md "
                  />
                {FormValidation.message("ownerName", FormVal?.ownerName, "required|alpha")}
                <p className=" text-red-500">{fromErrors?.ownerName}</p>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    name="ownerAddress"
                    value={FormVal?.ownerAddress}
                    onChange={handelChange}
                    class="block w-full shadow-sm px-4  text-gray-700 bg-white outline-none border-b-2 border-blue-200 rounded-md "
                  />
                   {FormValidation.message("ownerAddress", FormVal?.ownerAddress, "required")}
                <p className=" text-red-500">{fromErrors?.ownerAddress}</p>
                </div>

                <div>
                  <input
                    id=""
                    type="text"
                    name="ownerPhone"
                    placeholder="Phone Number"
                    value={FormVal?.ownerPhone}
                    onChange={handelChange}
                    class="block w-full shadow-sm px-4 text-gray-700 bg-white outline-none border-b-2 border-blue-200 rounded-md "
                  />
                      {FormValidation.message("ownerPhone", FormVal?.ownerPhone, "required|phone")}
                <p className=" text-red-500">{fromErrors?.ownerPhone}</p>
                </div>

                <div>
                  <input
                    id="car no"
                    type="text"
                    name="carNumber"
                    placeholder="Car Number"
                    value={FormVal?.carNumber}
                    onChange={handelChange}
                    class="block w-full shadow-sm px-4 text-gray-700 bg-white outline-none border-b-2 border-blue-200 rounded-md "
                  />
                 {FormValidation.message("carNumber", FormVal?.carNumber, "required|min:10|max:10")}
                 {/* {FormValidation.message("carNumber", FormVal?.carNumber, "required|")} */}
                <p className=" text-red-500">{fromErrors?.carNumber}</p>
                </div>

                <div>
                  <input
                    type="text"
                    name="model"
                    id="Car Model"
                    placeholder="Car Model"
                    value={FormVal?.model}
                    onChange={handelChange}
                    class="block w-full shadow-sm px-4 text-gray-700 bg-white outline-none border-b-2 border-blue-200 rounded-md "
                  />
                    {FormValidation.message("model", FormVal?.model, "required|integer")}
                <p className=" text-red-500">{fromErrors?.model}</p>
                </div>

                <div>
                  <input
                    id=""
                    name="company"
                    type="text"
                    placeholder="Car Company Name"
                    value={FormVal?.company}
                    onChange={handelChange}
                    class="block w-full shadow-sm px-4 text-gray-700 bg-white outline-none border-b-2 border-blue-200 rounded-md "
                  />
                    {FormValidation.message("company", FormVal?.company, "required|alpha_space")}
                <p className=" text-red-500">{fromErrors?.company}</p>
                </div>
              </div>

              <div class="flex justify-end mt-4 mr-7 w-full ">
                <button class="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md w-1/4 md:py-2 py-2 font-bold shadow-sm leading-5 text-white transition-colors duration-300 ">
                  Sumbit
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default Addcars;
