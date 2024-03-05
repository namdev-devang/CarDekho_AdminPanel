import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  // const  data = [1,2,3,5,6,7]
  const [data,setData]=useState([])
  
  useEffect(()=>{
    getUserList()
  },[])
  const token = JSON.parse(localStorage.getItem('token'))

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

  // console.log();
  return (
    <>
    {/* {
      data?.map((item)=>(

        <h1> Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, doloremque. Numquam expedita ducimus temporibus aut natus nihil, iste, officia eligendi repellendus aliquam necessitatibus sequi error accusamus molestiae ad dolor vero eaque omnis iure sit facere aliquid quos quasi enim! Perspiciatis ipsam quisquam vitae aperiam est facere animi laudantium similique perferendis sint dolorum voluptate, alias eius amet ab in maiores, tenetur assumenda aliquam laborum. Sit vel quibusdam error alias adipisci? Ipsam ut aspernatur iusto neque obcaecati a! Quos sed, sequi eaque aut adipisci vitae fugiat praesentium numquam omnis odit illum nesciunt enim voluptates voluptas totam dolor. Laboriosam, necessitatibus.</h1>
      ))
    } */}

      {
        data.map((item)=>{
          
        })
      }

    </>
  )
}

export default Dashboard;
