import React, { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../UserContext/UseContext";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { toast } from "react-hot-toast";

const CompleteTask = () => {
  const { user } = useContext(AuthContext);

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://y-six-amber.vercel.app/complete?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  //   delete
  const deleteButton = (event) => {
    const agree = window.confirm(`Are you sure to delete ${event.title}`);
    if (agree) {
      fetch(`https://y-six-amber.vercel.app/delete/${event._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success(`Successfully Deleted ${event.title}`);
          refetch();
        })

        .catch((error) => {
          toast.error(error.message);
        });
    }
  };


//   NOT COMPLETE TASK 
const notCompleteButton = (event) => {
    fetch(`https://y-six-amber.vercel.app/completedTask/${event._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application.json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("send to myTask");
        refetch();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="">
     {
        tasks?.length?  <h1 className="text-sm md:text-3xl font-bold text-center my-10 text-rose-400">
        {user?.displayName} Complete Task
      </h1>
      :
      <h1 className="text-sm md:text-3xl font-bold text-center my-10 text-rose-400">
      {user?.displayName} Has 0 Complete Task
    </h1>
     }
      {tasks?.map((task) => (
        <div
          key={task._id}
          className="shadow-xl  hover:border-0 hover:duration-500 duration-500 hover:shadow-2xl bg-base-100 rounded p-4 my-10"
        >
          <div className="flex justify-between my-4">
            <div>
              <h1 className="text-3xl font-bold">{task.title}</h1>
              {task?.picture ? (
                <PhotoProvider>
                  <PhotoView src={task.picture}>
                    <img className="w-8 h-8" src={task.picture} alt="" />
                  </PhotoView>
                </PhotoProvider>
              ) : (
                ""
              )}
            </div>

            <div className="flex justify-center items-center">
              <Link
              onClick={()=>deleteButton(task)}
                title="Press to Delete"
                className="btn  p-2 hover:shadow-xl rounded mr-2"
              >
                <FaTrashAlt></FaTrashAlt>
              </Link>
              <Link
              onClick={()=> notCompleteButton(task)}
                title="Press to Delete"
                className="btn  p-2 hover:shadow-xl rounded mr-2"
              >
              
              </Link>
              
            </div>
          </div>
          <h3 className="text-sm md:text-xl font-medium">{task?.task}</h3>
          <h1>Added: {task?.time}</h1>
        </div>
      ))}
    </div>
  );
};

export default CompleteTask;
