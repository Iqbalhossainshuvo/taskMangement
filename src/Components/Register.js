import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import {  FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../UserContext/UseContext";

const Register = () => {
  const { createUser, updateUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const createUsers = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const formData = new FormData();

    formData.append("image", image);
    const url =
      "https://api.imgbb.com/1/upload?=600&key=7bfed1b127f1b0296e21aab609f45785";
    fetch(url, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((imageData) => {
        const imgUrl = imageData.data.display_url;
        console.log(imgUrl);
        createUser(email, password)
          .then((data) => {
            console.log(data);
            updateUser(name, imgUrl);
            toast.success("successfully created user");
            navigate(from, { replace: true });
          })
          .catch((error) => console.log(error.message));
      });
  };

  const google = () => {
    googleLogin().then((result) => {
      toast.success("successfully login");
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="overflow-hidden shadow-xl p-5 lg:w-4/12 mx-auto lg:my-16 rounded">
      <form onSubmit={createUsers} className="space-y-6 ng-untouched ng-pristine ng-valid">
        <h1 className="text-sm md:text-3xl font-bold text-center my-4">
          Register
        </h1>

        <input
          type="text"
          name="name"
          id=""
          className="w-full p-3 rounded bg-gray-100"
          placeholder="Your Name"
          required
        />

        <br />
        <input
          type="email"
          name="email"
          id=""
          className="w-full p-3 rounded bg-gray-100"
          placeholder="Your Email"
          required
        />

        <br />

        <input
          type="password"
          name="password"
          id=""
          className="w-full p-3 rounded bg-gray-100"
          placeholder="Your Password"
          required
        />

        <br />
        <input
          type="file"
          name="image"
          className="border w-full my-3 rounded"
          id=""
          required
        />

        <br />
        <div className="items-center justify-center text-center flex">
          <input
            type="submit"
            className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-rose-600 text-gray-50" 
            value="Register"
          />
        </div>
      </form>

      <fieldset className="border-t border-gray-400">
        <legend className="mx-auto px-4 text-2xl">Or</legend>
      </fieldset>

      <div className="flex gap-6 justify-center items-center my-4">
        <button
          onClick={google}
          className="btn p-4 rounded-full border border-green-400"
        >
          <FaGoogle></FaGoogle>
        </button>
      </div>

      <p className="text-center">
        Back To{" "}
        <Link to="/login" className="text-rose-400">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
