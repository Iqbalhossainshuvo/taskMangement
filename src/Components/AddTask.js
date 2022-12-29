import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import image from "../assets/task.gif";
import { AuthContext } from "../UserContext/UseContext";
const AddTask = () => {
  const { user } = useContext(AuthContext);

  const formSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const task = form.task.value;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const url =
    `https://api.imgbb.com/1/upload?key=bb406e6aefacc44e37d7220991feb6f5`;

    if (task.length && image?.name?.length && title.length) {
      fetch(url, { method: "POST", body: formData })
        .then((res) => res.json())
        .then((imageData) => {
          const imgUrl = imageData.data.display_url;
          const taskData = {
            title,
            task,
            email: user.email,
            time: format(new Date(), "PPPP"),
            picture: imgUrl,
            complete: false,
          };
          if (imageData.success) {
            fetch("https://y-six-amber.vercel.app/task", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(taskData),
            })
              .then((res) => res.json())
              .then((data) => {
                toast.success("success");
                form.reset();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else if (image?.name?.length && title.length && !task.length) {
      fetch(url, { method: "POST", body: formData })
        .then((res) => res.json())
        .then((imageData) => {
          const imgUrl = imageData.data.display_url;
          const taskData = {
            title,

            email: user.email,
            time: format(new Date(), "PPPP"),
            picture: imgUrl,
            complete: false,
          };
          if (imageData.success) {
            fetch("https://y-six-amber.vercel.app/task", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(taskData),
            })
              .then((res) => res.json())
              .then((data) => {
                toast.success("success");
                form.reset();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })

        .catch((error) => {
          toast.error(error.message);
        });
    } else if (task.length && title.length && !image?.name?.length) {
      const taskData = {
        title,
        task,
        email: user.email,
        time: format(new Date(), "PPPP"),
        complete: false,
      };
      fetch("https://y-six-amber.vercel.app/task", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(taskData),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("success");
          form.reset();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="p-9">
      <div className=" lg:w-6/12 lg:mx-auto gap-4 justify-center items-center text-center">
        <form
          onSubmit={formSubmit}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <h2 className="text-sm md:text-2xl  mb-2 font-bold text-rose-400 ">
            Add Your Task  {user?.displayName}
          </h2>

          <p className="mb-3"> {format(new Date(), "PPPP")}.</p>
          <input
            type="text"
            className="w-full p-3 rounded bg-gray-100"
            placeholder="Type  Task Title"
            name="title"
            required
          />
          <br />


          <input
            type="text"
            className="w-full p-3 rounded bg-gray-100"
            placeholder="Type Your  Task"
            name="task"
            
          />

          <br />
          <input
            type="file"
            name="image"
            id=""
            placeholder="Upload Your Image"
            className="w-full p-3 rounded bg-gray-100"
          />
          <br />

          <input
            id="idSubmitTask"
            type="submit"
           className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-rose-600 text-gray-50"
            value="Submit your Task"
          />
        </form>
      </div>
    </div>
  );
};

export default AddTask;
