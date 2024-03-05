import axios from "axios";
import { event } from "jquery";
import React, { useEffect, useState } from "react";
// import { CgProfile } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";
// import { LuLogOut } from "react-icons/lu";
// import { Link, useParams } from "react-router-dom";

const Profile = (props) => {
  console.log(props)
  const [FormVal, setFormVal] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
    _id: "",
    image: "",
  });

  const [singleData, setsingleData] = useState([]);
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [image1, setImage1] = useState(null);

  const handelChange = (e) => {
    setFormVal({ ...FormVal, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`http://localhost:8080/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.setItem("userName", JSON.stringify(res?.data?.user?.name));
        setImage1(res?.data?.user?.image);
        setImage(res?.data?.user?.image);
        setsingleData(res.data.user);
        setFormVal({
          ...FormVal,
          name: res?.data?.user?.name,
          _id: res?.data?.user?._id,
          email: res?.data?.user?.email,
          address: res?.data?.user?.address,
          phone: res?.data?.user?.phone,
        });
      });
  };
  const handelUpdateProfile = () => {
    const formData = new FormData();
    formData.append("_id", FormVal?._id);
    formData.append("name", FormVal?.name);
    formData.append("phone", FormVal?.phone);
    formData.append("email", FormVal?.email);
    formData.append("address", FormVal?.address);
    formData.append("image", image); // Assuming 'image' is available
    const token = JSON.parse(localStorage.getItem("token"));

    axios({
      url: "http://localhost:8080/api/user/profile",
      method: "put",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Ensure proper content type for FormData
      },
    })
      .then((res) => {
        setIsEdit(!isEdit);
        // props.onclick();
        getProfile();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  };
  const handleImage = (event) => {
    setImage(event.target.files[0]);
    const data = URL.createObjectURL(event.target.files[0]);
    setImage1(data);
  };
  // console.log();
  // console.log(hover);
  return (
    <>
      <div className="w-11/12 Main px-4 ">
        {!isEdit ? (
          <>
            <div className="">
              <center>
                <img
                  className="lg:w-32 lg:h-32 w-32 h-32 rounded-full object-cover bg-black text-black"
                  src={
                    image1
                      ? image1
                      : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                  }
                  alt=""
                  srcset=""
                />
              </center>
            </div>
            <section class="w-full px-10 py-4  bg-white rounded-2xl  border my-4 ">
              <h2 class="text-lg font-medium text-gray-700 capitalize ">
                Profile Details
              </h2>

              <form className="mt-5">
                <div class="grid grid-cols-1 lg:gap-6 gap-2 mt-2 sm:grid-cols-2">
                  {singleData && (
                    <>
                      {/* <h1>{singleData.name}</h1> */}

                      <div className="">
                        <label
                          class="text-gray-700 font-bold text-sm"
                          for="username"
                        >
                          Name
                        </label>
                        <input
                          readOnly={true}
                          name="name"
                          id="name"
                          type="text"
                          class="block w-full px-4 py-1 mt-1 text-gray-700 bg-white border-2 border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-50 focus:outline-none focus:ring"
                          onChange={handelChange}
                          // value={FormVal?.name}
                          value={FormVal?.name}
                        />
                      </div>
                      <div>
                        <label
                          class="text-gray-700 font-bold text-sm"
                          for="emailAddress"
                        >
                          Email
                        </label>
                        <input
                          readOnly={true}
                          id="emailAddress"
                          type="email"
                          name="email"
                          class="block w-full  px-4 py-1 mt-1 text-gray-700 bg-white border-2 border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          value={FormVal?.email}
                        />
                      </div>

                      <div>
                        <label
                          class="text-gray-700 font-bold text-sm"
                          for="Address"
                        >
                          Address
                        </label>
                        <input
                          readOnly={true}
                          id="Address"
                          type="text"
                          name="address"
                          class="block w-full  px-4 py-1 mt-1 text-gray-700 bg-white border-2 border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          value={FormVal?.address}
                        />
                      </div>

                      <div>
                        <label
                          class="text-gray-700 font-bold text-sm"
                          for="phone"
                        >
                          Phone
                        </label>
                        <input
                          readOnly={true}
                          id="phone"
                          type="number"
                          name="phone"
                          class="block w-full  px- py-1 mt-1 text-gray-700 bg-white border-2 border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          value={FormVal?.phone}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div class="flex md:justify-start justify-center mb-12">
                  <button
                    type="button"
                    onClick={() => setIsEdit(!isEdit)}
                    class="md:px-6 mt-4 py-3 px-2 rounded-m leading-5  text-white font-bold transition-colors duration-300 transform bg-indigo-600 rounded-full hover:bg-indigo-400 focus:outline-none text-xs lg:text-sm "
                  >
                    Edit Profile
                  </button>
                </div>
              </form>
            </section>
          </>
        ) : (
          <>
            <div className="">
              <center>
                <img
                  className="lg:w-32 lg:h-32 w-32 h-32 rounded-full object-cover bg-black text-black"
                  src={
                    image1
                      ? image1
                      : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                  }
                  alt=""
                  srcset=""
                />
                <label className="text-[18px] cursor-pointer" for="fileShow">
                  <FaRegEdit />
                </label>
                <input
                  type="file"
                  id="fileShow"
                  className="hidden"
                  name="myImage"
                  onChange={(event) => handleImage(event)}
                ></input>
              </center>
            </div>
            <section class="w-full px-10 py-4  bg-white rounded-2xl  border my-4 ">
              <h2 class="text-lg font-medium text-gray-700 capitalize ">
                Change Profile Details
              </h2>

              <form className="mt-5">
                <div class="grid grid-cols-1 lg:gap-6 gap-2 mt-2 sm:grid-cols-2">
                  {singleData && (
                    <>
                      {/* <h1>{singleData.name}</h1> */}

                      <div className="">
                        <label
                          class="text-gray-700 font-bold text-sm"
                          for="username"
                        >
                          Name
                        </label>
                        <input
                          name="name"
                          id="name"
                          type="text"
                          class="block w-full px-4 py-1 mt-1 text-gray-700 bg-white border-2 border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-50 focus:outline-none focus:ring"
                          onChange={handelChange}
                          value={FormVal?.name}
                        />
                      </div>
                      <div>
                        <label
                          class="text-gray-700 font-bold text-sm"
                          for="emailAddress"
                        >
                          Email
                        </label>
                        <input
                          readOnly={true}
                          id="emailAddress"
                          type="email"
                          name="email"
                          class="block w-full  px-4 py-1 mt-1 text-gray-700 bg-white border-2 border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          value={FormVal?.email}
                        />
                      </div>

                      <div>
                        <label
                          class="text-gray-700 font-bold text-sm"
                          for="Address"
                        >
                          Address
                        </label>
                        <input
                          onChange={handelChange}
                          id="Address"
                          type="text"
                          name="address"
                          class="block w-full  px-4 py-1 mt-1 text-gray-700 bg-white border-2 border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          value={FormVal?.address}
                        />
                      </div>

                      <div>
                        <label
                          class="text-gray-700 font-bold text-sm"
                          for="phone"
                        >
                          Phone
                        </label>
                        <input
                          onChange={handelChange}
                          id="phone"
                          type="number"
                          name="phone"
                          class="block w-full  px- py-1 mt-1 text-gray-700 bg-white border-2 border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          value={FormVal?.phone}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div class="flex md:justify-start justify-center mb-12">
                  <button
                    onClick={() => handelUpdateProfile()}
                    type="button"
                    class="md:px-6 mt-4 py-3 px-2 rounded-m leading-5  text-white font-bold transition-colors duration-300 transform bg-indigo-600 rounded-full hover:bg-indigo-400 focus:outline-none text-xs lg:text-sm "
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
