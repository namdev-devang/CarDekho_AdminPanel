import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserDetails = () => {
  const [data, setData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    axios
      .get("http://localhost:8080/api/user/user-list", {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      })
      .then((res) => {
        setData(res.data.users);
      })
      .catch((err) => {
        console.log(err, "errr");
      });
  };

  const handelStatus = (val) => {
    const data = {
      id: val,
    };
    axios({
      url: "http://localhost:8080/api/user/update-status",
      data: data,
      method: "put",
      headers: {
        Authorization: `Bearer ${token} `,
      },
    })
      .then((res) => {
        if (res?.data?.success == true) {
          message.success(res?.data?.message);
          getUserList();
        } else {
          message.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err, "errr");
      });
  };

  const Delete = (id) => {
    const data = {
      id: id,
    };

    axios({
      url: `http://localhost:8080/api/user/delete`,
      method: "delete",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res, "ress");
        message.success("Your Car Data Deleted SucessFully");
        getUserList();
      })
      .catch((err) => {
        console.log(err, "err");
        message.error("errr");
      });
  };
  return (
    <div>
      {data.length == 0 ? (
        <>
          {" "}
          <center>
            <section class=" text-gray-600 body-font">
              <div class="container px-5 py-48 mx-auto ">
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
                  <h1 className="font-bold">Your User list is Empty</h1>
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
            </section>
          </center>
        </>
      ) : (
        <section className="container px-4 py-2 mx-auto z-10">
          <div className="flex justify-between items-center gap-x-3">
            <h2 className="text-lg font-medium text-black ">User's Listing</h2>
          </div>

          <div className="flex flex-col mt-6 z-10">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200  rounded-md">
                  <table className="min-w-full divide-y text-black ">
                    <thead className="bg-gray-50 ">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>Name</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Status</span>

                            <svg
                              className="h-3"
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
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Phone</span>
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          Email address
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          Address
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right text-black font-bold"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white ">
                      {data?.map((item) => {
                        return (
                          <>
                            <tr key={item.id}>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <div className="flex items-center gap-x-2">
                                    {/* <img
                                className="object-cover w-10 h-10 rounded-full"
                                // src={item.images[0]}
                                alt=""
                              /> */}
                                    <div>
                                      <h2 className="font-medium text-black ">
                                        {item?.name}
                                      </h2>
                                      {/* <p className="text-sm font-normal text-gray-600 ">
                                  @authurmelo
                                </p> */}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="cursor-pointer inline-flex items-center px-3 py-1 rounded-md gap-x-2 bg-emerald-100/60 ">
                                  <h2
                                    onClick={() => handelStatus(item?._id)}
                                    className="text-sm font-normal  text-emerald-500"
                                  >
                                    {item?.status == "1" ? (
                                      <h2>Inactive</h2>
                                    ) : (
                                      <h2>Active</h2>
                                    )}
                                  </h2>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-black  whitespace-nowrap">
                                {item?.phone}
                              </td>
                              <td className="px-4 py-4 text-sm text-black  whitespace-nowrap">
                                {item?.email}
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                  <p className="px-3 py-1 text-xs text-blue-400 font-bold rounded-full dark:bg-gray-100 bg-pink-100/60">
                                    {item?.address}
                                  </p>
                                </div>
                              </td>
                              <td className="px-4 py-2 text-sm whitespace-nowrap">
                                <div className="flex items-center gap-x-1 ">
                                  <button
                                    onClick={() => Delete(item._id)}
                                    className="ml-4 text-gray-500 transition-colors duration-200  hover:text-red-600 focus:outline-none"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5"
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserDetails;
