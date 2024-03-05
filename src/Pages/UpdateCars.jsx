import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

const UpdateCars = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [ownerName, setownerName] = useState();
  const [ownerAddress, setownerAddress] = useState();
  const [carNumber, setcarNumber] = useState();
  const [ownerPhone, setownerPhone] = useState();
  const [company, setcompany] = useState();
  const [model, setmodel] = useState();

  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    axios
      .get(`http://localhost:8080/api/car/car-data/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res, "hiii");
        setownerName(res?.data?.data?.ownerName);
        setownerAddress(res?.data?.data?.ownerAddress);
        setcarNumber(res?.data?.data?.carNumber);
        setownerPhone(res?.data?.data?.ownerPhone);
        setcompany(res?.data?.data?.company);
        setmodel(res?.data?.data?.model);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    const data = {
      ownerName: ownerName,
      ownerAddress: ownerAddress,
      carNumber: carNumber,
      ownerPhone: ownerPhone,
      company: company,
      model: model,
    };
    axios({
      url: `http://localhost:8080/api/car/update/${_id}`,
      method: "put",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res?.data?.success == true) {
          message.success(res?.data?.message);
          navigate("/car-details");
        } else {
          message.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="bg-[rgba(196,201,255,0.4)] flex justify-center items-center absolute top-[-85px] left-0  z-50 w-full h-full overflow-y-auto pt-10">
        <div className="md:w-1/3 w-full m-2 p-3 rounded-md bg-[#fffffa]  border-2 border-gray-500">
          <h1 className="text-center text-2xl my- font-bold text-black ">
            Edit_Car's form
          </h1>

          <section class=" px-4 mx-auto bg-white rounded-md  text-black">
            <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white ">
              Account settings
            </h2>

            <form>
              <div class="grid lg:grid-cols-1 gap-6 lg:mx-10">
                <div>
                  <input
                    id=""
                    type="text"
                    name="ownerName"
                    placeholder="Owner_Name"
                    onChange={(e) => setownerName(e.target.value)}
                    value={ownerName}
                    class="block w-full shadow-sm px-4 py-1 mt-2 text-gray-700 bg-white outline-none border-b-2 border-blue-200 rounded-md "
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    name="ownerAddress"
                    onChange={(e) => setownerAddress(e.target.value)}
                    value={ownerAddress}
                    class="block w-full shadow-sm px-4 py-1 mt-2 text-gray-700 bg-white outline-none border-b-2 border-blue-200 rounded-md "
                  />
                </div>

                <div>
                  <input
                    id=""
                    type="text"
                    name="ownerPhone"
                    placeholder="Phone Number"
                    onChange={(e) => setownerPhone(e.target.value)}
                    value={ownerPhone}
                    class="block w-full shadow-sm px-4 py-1 mt-2 text-gray-700 bg-white outline-none border-b-2 border-blue-200 rounded-md "
                  />
                </div>

                <div>
                  <input
                    id="car no"
                    type="text"
                    name="carNumber"
                    placeholder="Car Number"
                    onChange={(e) => setcarNumber(e.target.value)}
                    value={carNumber}
                    class="block w-full shadow-sm px-4 py-1 mt-2 text-gray-700 bg-white outline-none border-b-2 border-blue-200 rounded-md "
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="model"
                    id="Car Model"
                    placeholder="Car Model"
                    onChange={(e) => setmodel(e.target.value)}
                    value={model}
                    class="block w-full shadow-sm px-4 py-1 mt-2 text-gray-700 bg-white outline-none border-b-2 border-blue-200 rounded-md "
                  />
                </div>

                <div>
                  <input
                    id=""
                    name="company"
                    type="text"
                    placeholder="Car Make"
                    onChange={(e) => setcompany(e.target.value)}
                    value={company}
                    class="block w-full shadow-sm px-4 py-1 mt-2 text-gray-700 bg-white outline-none border-b-2 border-blue-200 rounded-md "
                  />
                </div>
              </div>

              <div class="flex justify-end mt-4 mr-7 w-full ">
                <button
                  onClick={handleUpdate}
                  type="button"
                  class="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md w-1/4 md:py-2 py-2 font-bold shadow-sm leading-5 text-white transition-colors duration-300 "
                >
                  Sumbit
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UpdateCars;
