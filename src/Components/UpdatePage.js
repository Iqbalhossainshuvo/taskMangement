import { format } from "date-fns";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../UserContext/UseContext";

const UpdatePage = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

    const updateButton = (event) => {
      event.preventDefault();
      const task = event.target.task.value;

      const user = { task };

      fetch(`https://y-six-amber.vercel.app/updateTask/${data._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Updated Successfully");
          navigate("/myTask");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };

 
  return (
    <div className="p-9">
      <div className=" lg:w-6/12 lg:mx-auto gap-4 justify-center items-center text-center">
        <form
          onSubmit={updateButton}
          className="bg-base-100 shadow-xl rounded my-4 w-12/6 p-4"
        >
          <h2 className="text-sm md:text-2xl  mb-2 font-bold text-rose-400 ">
            Update Your Task {user?.displayName}
          </h2>

          <p className="mb-3"> {format(new Date(), "PPPP")}.</p>
          <input
            type="text"
            className="w-full rounded my-2"
            value={data.title}
            readOnly
            placeholder="Type  Task Title"
            name="title"
            required
          />
          <br />

          <input
            type="text"
            className="w-full rounded my-2 py-6"
            placeholder="Type Your  Task"
            name="task"
          />

         

          <br />

          <input
            id="idSubmitTask"
            type="submit"
            className="btn border  hover:bg-green-400 duration-500 hover:duration-300 p-3 rounded"
            value="Update your Task"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;
