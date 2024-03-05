import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";


const Layout = (ChildComponent) => () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle(!toggle);
 

  return (
    <div className="h-screen overflow-hidden">
      <Header handleToggle={handleToggle} />
      <hr />
      <div className="flex relative h-full">
        <div
          id="sidebardScroll"
          className={` absolute md:static  top-0 ${
            toggle ? "left-0 w-60 md:w-0" : "-left-full md:w-1/4  lg:w-1/5"
          }  bg-[#f4f1ee] overflow-y-auto h-full transition-all duration-100 ease-linear`}
        >
          <Sidebar/>
        </div>
        <div
          className={`w-full ${
            toggle ? "w-full" : "md:w-3/4 lg:w-4/5"
          }  p-4 overflow-y-auto h-full`}
        >
          <ChildComponent />
        </div>
      </div>
    </div>
  );
};
export default Layout;
