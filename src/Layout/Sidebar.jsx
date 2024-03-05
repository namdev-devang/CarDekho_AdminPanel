import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { VscDashboard } from "react-icons/vsc";
// import { MdDashboardCustomize } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [role, setRole] = useState();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    getProfile(token);
  }, []);

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
  return (
    <>
      <div className="mt-4 space-y-1 ">
        <Link to="/dashboard" className="font-bold ">
          <div
            className={`flex items-center mx-2 cursor-pointer py-2 rounded-md hover:bg-[#ece6df] ${
              pathname == "/dashboard" && "bg-[#ece6df]"
            }  `}
          >
            <VscDashboard className="w-10 text-xl" />
            Dashboard
          </div>
        </Link>

        <Link to="/car-details" className="ml- font-bold ">
          <div
            className={` flex items-center mx-2 cursor-pointer py-2 rounded-md hover:bg-[#ece6df] ${
              pathname == "/car-details" && "bg-[#ece6df]"
            }  `}
          >
            <FaRegAddressCard className="w-10 text-xl " />
            Car's
          </div>
        </Link>

        {role == "1" && (
          <Link to="/user-details" className="ml- font-bold ">
            <div
              className={` flex items-center mx-2 cursor-pointer py-2 rounded-md hover:bg-[#ece6df] ${
                pathname == "/user-details" && "bg-[#ece6df]"
              }  `}
            >
              <FaRegAddressCard className="w-10 text-xl " />
              User's
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default Sidebar;
