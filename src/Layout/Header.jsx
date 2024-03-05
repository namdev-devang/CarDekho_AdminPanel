import React, { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import axios from "axios";

const Header = (props) => {
  const [DropDown, setdropDown] = useState(false);
  const [name, setName] = useState();
  const [image, setImage] = useState(null);
  const { handleToggle } = props;
  const navigate = useNavigate();

  const handeldropDown = () => {
    setdropDown(!DropDown);
  };
  const removeToken = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    getProfile(token);
    // handeldropDown()
  }, []);

  const getProfile = (val) => {
    axios
      .get(`http://localhost:8080/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${val}`,
        },
      })
      .then((res) => {
        setName(res?.data?.user?.name);
        setImage(res?.data?.user?.image);
      });
  };
  return (
    <>
      <div className="flex justify-between shadow-sm px-4 py-4 z-0 bg-[#e2dcd5] ">
        <div className=" flex gap-2 items-center">
          <div
            onClick={handleToggle}
            className=" text-xl font-semibold  text-[#19191C] cursor-pointer gao"
          >
            <RxHamburgerMenu className="bg-[#e8e1d8] rounded-sm" />
          </div>
          <div className=" border-[#e4e4e4] ml-4">
            <img
              className="w-[5rem]"
              src="https://uploads-ssl.webflow.com/5e7a465cfe669f130650234b/60a294369af0b00a099b8ee6_Equify2.svg"
              alt=""
            />
          </div>
        </div>

        {/* <button className='m-auto'>Log</button> */}
        <div
          onClick={handeldropDown}
          className="cursor-pointer items-center w gap-1 flex justify-end px-1 py-1 -[#fcffdf] rounded-md "
        >
          {/* <input
            type="text"
            className="bg-[#e8e1d8] border px-2 sm:mr-4 py-1 rounded-md w-24 lg:w-auto"
            placeholder="Search..."
          /> */}
          <img
            className="w-11 object-cover h-11 rounded-full "
            src={
              image ??
              "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
            }
          />
          {/* <h1>Devang</h1> */}
          {/* {!DropDown ? <IoMdArrowDropdown /> : <IoMdArrowDropup />} */}
          <h1 className="text-sm font-bold sm:block hidden">{name}</h1>
        </div>
      </div>
      {DropDown && (
        <div
          onClick={() => setdropDown(!DropDown)}
          className=" bg-white cursor-pointer z-50 absolute top-20 w-32 right-1 rounded-md shadow-sm items-end ml-52"
        >
          <Link to="/profile">
            <span className=" flex items-center px-2 py-1 gap-2">
              <CgProfile /> Profile
            </span>
          </Link>
          <hr />
          <span
            onClick={removeToken}
            className=" flex items-center px-2 py-1 gap-2"
          >
            <LuLogOut /> Logout
          </span>
        </div>
      )}
    </>
  );
};

export default Header;
