import axios from "axios";
import React, { useEffect, useState } from "react";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { FaEye } from "react-icons/fa";
import Addcars from "./Addcars";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const CarDetails = () => {
  const [Popup, setPopup] = useState(false);
  const [updatePopup, setupdatePopup] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);


  // const [filteredData, setFilteredData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [role, setRole] = useState();

  // useEffect(()=>{
  //   fetchData()
  // },[])

  // const fetchData = () =>{
  //   axios.get('http://localhost:8080/api/car/cars-list')
  //   .then((ress)=>{
  //   setFilteredData(ress.data.users);
  //   }).catch((err)=>{
  //       console.log(err);
  //   })
  // }

  const handleSearchInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const filterData = data.filter(item =>
    item.carNumber.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    loadcars();
  }, [Addcars]);

  useEffect(() => {
    loadcars();
    getProfile(token);
  }, []);

  const handelPopUp = () => {
    setPopup(!Popup);
  };

  const handleUpdatePopup = () => {
    setupdatePopup(!updatePopup);
  };

  // console.log(Popup);

  const loadcars = () => {
    setloading(true);
    axios
      .get("http://localhost:8080/api/car/cars-list", {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      })
      .then((res) => {
        setData(res.data.users);
        setloading(false);
        // data();
      })
      .catch((err) => {
        console.log(err);
        // console.log(err, "errr");
      });
  };

  const Delete = (id) => {
    const data = {
      id: id,
    };
    setloading(true);
    axios({
      url: `http://localhost:8080/api/car/delete`,
      method: "delete",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res?.data?.success == "true") {
        message.success("Your Car Data Deleted SucessFully");
        loadcars();
        setloading(false);
      } else {
        message.error("Please try after some time");
      }
    });
  };

  const updatePage = (val) => {
    navigate(`/update-car/${val}`);
  };

  const getProfile = (val) => {
    axios
      .get(`http://localhost:8080/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${val}`,
        },
      })
      .then((res) => {
        setRole(res?.data?.user?.role);
      });
  };
  if (loading) {
    return (
      <>
        <h1 className="text-3xl text-center my-48">Loading...</h1>
      </>
    );
  }

  return (
    <>
    {/* <h1>Hllo</h1> */}
    <input
        type="text"
        className="border px-2 rounded-md w-full text-center py-1 mb-2 outline-none" 
        placeholder="Search..."
        value={inputValue}
        onChange={handleSearchInputChange}
      />
      {data.length == 0 ? (
        <>
          {" "}
          <div class="flex justify-between items-center gap-x-3">
            <h2 class="text-lg font-medium text-black ">Car's Listing</h2>

            <h1
              onClick={handelPopUp}
              class="text-center flex px-2 py-1 text-base gap-1 items-center dark:text-black dark:bg-[#fffbf6] hover:bg-[#fdf5eb] hover:text-black rounded-md font-bold cursor-pointer border-[#e2dcd5] border-r-4 border-b-4"
            >
              <VscGitPullRequestCreate className="text-base " />
              Add_Car's
            </h1>
            {Popup && <Addcars handelPopUp={handelPopUp} load={loadcars} />}
          </div>{" "}
          <section class=" text-gray-600 body-font">
            <div class="container px-5 py-[11rem] mx-auto ">
              <div class="lg:w-1/2 bg-gray-200 p-5  mx-auto rounded-md text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="inline-block w-8 h-8 text-gray-400 mb-8"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>

                <h2 class="title-font tracking-wider text-sm font-bold">
                  {/* Name:-{singleData?.ownerName} */}
                </h2>
                <h1 className="font-bold">Your Car's list is Empty</h1>
                <h1 className="font-bold my-1">
                  {/* Company:- {singleData?.company} */}
                </h1>
                <h1 className="font-bold my-1 ">
                  {/* Mob No:-{" "} */}
                  <span className="hover:underline cursor-pointer">
                    {/* {singleData?.ownerPhone} */}
                  </span>
                </h1>
                <h1 className="font-bold my-1">
                  {/* {" "} */}
                  {/* CarNumber:- {singleData?.carNumber} */}
                </h1>
                <center>
                  <img
                    className="rounded-lg w-40"
                    // src={singleData?.qrImage}
                    alt=""
                    srcset=""
                  />
                </center>
                <span class="inline-block h-1 w-10 rounded bg-indigo-500 "></span>
              </div>
            </div>
          </section>{" "}
        </>
      ) : (
        <section class="container px-4 py-2 mx-auto z-10">
          <div class="flex justify-between items-center gap-x-3">
            <h2 class="text-lg font-medium text-black ">Car's Listing</h2>

            <h1
              onClick={handelPopUp}
              class="text-center flex px-2 py-1 text-base gap-1 items-center dark:text-black dark:bg-[#fffbf6] hover:bg-[#fdf5eb] hover:text-black rounded-md font-bold cursor-pointer border-[#e2dcd5] border-r-4 border-b-4"
            >
              <VscGitPullRequestCreate className="text-base " />
              Add_Car's
            </h1>
          </div>

          {Popup && <Addcars handelPopUp={handelPopUp} load={loadcars} />}

          <div class="flex flex-col mt-6 z-10">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200  rounded-md">
                  <table class="min-w-full divide-y text-black ">
                    <thead class="bg-gray-50 ">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 px-4 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          <div class="flex items-center gap-x-3">
                            <span>OwnerName</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          class="px-12 py-3.5 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          <button class="flex items-center gap-x-2">
                            <span>OwnerAddress</span>

                            <svg
                              class="h-3"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.1"
                              />
                              <path
                                d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.1"
                              />
                              <path
                                d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.3"
                              />
                            </svg>
                          </button>
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          <button class="flex items-center gap-x-2">
                            <span>CarNumber</span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              class="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                              />
                            </svg>
                          </button>
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          OwnerPhone
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          Company
                        </th>

                        <th
                          scope="col"
                          class="px-6 py-3.5 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          Model
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3.5 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white "></tbody>
                    {filterData?.map((item) => {
                      return (
                        <>
                          <tr key={item.id}>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div class="inline-flex items-center gap-x-3">
                                <div class="flex items-center gap-x-2">
                                  <div>
                                    <h2 class="font-medium text-black ">
                                      {item.ownerName}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div class="inline-flex items-center px-3 py-1 rounded-md gap-x-2  ">
                                <h2 class="text-sm  font-bold  text-emerald-500">
                                  {item?.ownerAddress}
                                </h2>
                              </div>
                            </td>
                            <td class="px-4 py-4 text-sm text-black  whitespace-nowrap">
                              {item?.carNumber}
                            </td>
                            <td class="px-4 py-4 text-sm text-black  whitespace-nowrap">
                              {item?.ownerPhone}
                            </td>
                            <td class="px-4 py-4 text-sm whitespace-nowrap">
                              <div class="flex items-center gap-x-2">
                                <p class="px-3 py-1 text-xs text-blue-400 font-bold rounded-full dark:bg-gray-100 bg-pink-100/60">
                                  {item?.company}
                                </p>
                              </div>
                            </td>
                            <td class="px-4 py-4 text-sm whitespace-nowrap">
                              <div class="flex items-center gap-x-2">
                                <p class="px-3 py-1 text-sm  font-bold rounded-full ">
                                  {item?.model}
                                  {/* {item?._id} */}
                                </p>
                              </div>
                            </td>

                            <td class="px-4 py-2 text-sm whitespace-nowrap">
                              <div class="flex items-center gap-x-1 ">
                                <Link to={`/car-views/${item._id}`}>
                                  <button class="text-gray-500 transition-colors duration-200  dark:text-gray-300 hover:text-blue-400 focus:outline-none">
                                    <FaEye className="text-xl border-r-2 w-8" />
                                  </button>
                                </Link>

                                {role == "1" && (
                                  <button
                                    onClick={() => updatePage(item?._id)}
                                    class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none border-r-2 w-6"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="w-5 h-5"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                      />
                                    </svg>
                                  </button>
                                )}

                                <button
                                  onClick={() => Delete(item._id)}
                                  class="text-gray-500 transition-colors duration-200  hover:text-red-600 focus:outline-none"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between mb-20 mt-4">
            <a
              href="#"
              class="flex items-center  text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-[3rem]  hover:bg-gray-100  dark:border-gray-700 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span></span>
            </a>
{/* 
            <div class="items-center hidden lg:flex gap-x-3">
              <a
                href="#"
                class="px-2 py-1 text-sm text-blue-500 rounded-md  bg-blue-100/60"
              >
                1
              </a>
              <a
                href="#"
                class="px-2 py-1 text-sm text-gray-500 rounded-md  hover:bg-gray-100"
              >
                2
              </a>
              <a
                href="#"
                class="px-2 py-1 text-sm text-gray-500 rounded-md  hover:bg-gray-100"
              >
                3
              </a>
              <a
                href="#"
                class="px-2 py-1 text-sm text-gray-500 rounded-md  hover:bg-gray-100"
              >
                ...
              </a>
              <a
                href="#"
                class="px-2 py-1 text-sm text-gray-500 rounded-md  hover:bg-gray-100"
              >
                12
              </a>
              <a
                href="#"
                class="px-2 py-1 text-sm text-gray-500 rounded-md  hover:bg-gray-100"
              >
                13
              </a>
              <a
                href="#"
                class="px-2 py-1 text-sm text-gray-500 rounded-md  hover:bg-gray-100"
              >
                14
              </a>
            </div> */}

            <a
              href="#"
              class="flex items-center  text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-[3rem]  hover:bg-gray-100  dark:border-gray-700 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </section>
      )}
    </>
  );
};

export default CarDetails;
