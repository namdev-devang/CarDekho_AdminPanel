import axios from "axios";
import React, { useEffect, useState } from "react";
// import { FaBackward } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const CarView = () => {
  const { _id } = useParams();
  const [Single, setData] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/car/car-data/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handelPrint = () =>{
    window.print()
  }
  return (
    <>
    <Link to='/car-details'>
      <IoMdArrowRoundBack className="text-2xl" />
    </Link>
      {/* <h1>Hello</h1> */}
      {Single && (
        <>
          <center>
            <div className="lg:w-1/2 border bg-slate-50 rounded-md">
              <img
                className="shadow-sm lg:w-72 md:w-auto md:my-32 my-40 rounded-xl "
                src={Single.qrImage}
                alt=""
                srcset=""
              />
            </div>
            <button className="bg-green-600 text-white px-3 py-1 my-2 rounded-md font-bold" onClick={handelPrint}>
            <h1>Print</h1>
            </button>
          </center>
          {/* <h1>{Single.qrImage}</h1> */}
        </>
      )}
    </>
  );
};

export default CarView;
