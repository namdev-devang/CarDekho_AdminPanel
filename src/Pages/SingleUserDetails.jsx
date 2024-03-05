import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const SingleUserDetails = () => {
  const { _id } = useParams();
  const [singleData, setSingleData] = useState([]);
  const [loading,setloading]=useState(false);


  const token = JSON.parse(localStorage.getItem("token"));

  const SingleCarDetails = () =>{
    setloading(true)
    axios
    .get(`http://localhost:8080/api/car/car-data/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setSingleData(res.data.data);
      setloading(false)
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(() => {
  
   SingleCarDetails()
  }, []);

  if (loading) {
    return(
      <>
      <h1 className="text-3xl text-center my-48">Loading...</h1>
      </>
    )
}
  return (
    <div>
      <Link to="/car-details">
        <IoMdArrowRoundBack className="text-2xl" />
      </Link>

      {/* <h1>Hello</h1> */}
      {singleData && (
        <>
          <center>
            <section class=" text-gray-600 body-font">
              <div class="container px-5 py-10 mx-auto ">
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
                    Name:-{singleData?.ownerName}
                  </h2>
                  <h1 className="font-bold my-1">
                    Company:- {singleData?.company}
                  </h1>
                  <h1 className="font-bold my-1 ">
                    Mob No:-{" "}
                    <span className="hover:underline cursor-pointer">
                      {singleData?.ownerPhone}
                    </span>
                  </h1>
                  <h1 className="font-bold my-1">
                    {" "}
                    CarNumber:- {singleData?.carNumber}
                  </h1>
                  <center>
                    <img
                      className="rounded-lg w-40"
                      src={singleData?.qrImage}
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
      )}
    </div>
  );
};

export default SingleUserDetails;
