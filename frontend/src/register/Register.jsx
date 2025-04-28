import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [inputData, setInputData] = useState({});
  const {setAuthUser} = useAuth();

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };
  const selectGender = (gender) => {
    setInputData({
      ...inputData,
      gender: inputData.gender === gender ? "" : gender,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (inputData.password !== inputData.confpassword) {
      console.log(inputData.password);
      console.log(inputData.confpassword);
      setloading(false);
      return toast.error("Password doesn't match");
    }
    try {
      const res = await axios.post("/api/auth/register", inputData);
      const data = res.data;

      if (data.success === false) {
        setloading(false);
        console.log(data.message);
        return;
      }

      toast.success(data.message);
      localStorage.setItem("Chatapp", JSON.stringify(data));
      setAuthUser(data);
      setloading(false);
      navigate("/");
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  // console.log(inputData);
  return (
    <div className="flex flex-col items-center justify-center mix-w-full mx-auto">
      <div className="w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-bold text-center text-gray-300">
          Login <span className="text-gray-950">Chatters</span>{" "}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                FullName :{" "}
              </span>
            </label>
            <input
              type="text"
              onChange={handleInput}
              placeholder="Enter Your Full name..."
              className="w-full input input-bordered h-10"
              id="fullname"
              required
            />
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                UserName :{" "}
              </span>
            </label>
            <input
              type="text"
              onChange={handleInput}
              placeholder="Enter User name..."
              className="w-full input input-bordered h-10"
              id="username"
              required
            />
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                Email:{" "}
              </span>
            </label>
            <input
              type="email"
              onChange={handleInput}
              placeholder="Enter Your Name: "
              className="w-full input input-bordered h-10"
              id="email"
              required
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                Password:{" "}
              </span>
            </label>
            <input
              type="password"
              onChange={handleInput}
              placeholder="Enter Your Password: "
              className="w-full input input-bordered h-10"
              id="password"
              required
            />
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                Confirm Password:{" "}
              </span>
            </label>
            <input
              type="text"
              onChange={handleInput}
              placeholder="Enter Your Password: "
              className="w-full input input-bordered h-10"
              id="confpassword"
              required
            />
          </div>
          <div id="gender" className="flex gap-2">
            <label className="cursor-pointer label flex gap-2">
              <span className="label-text font-semibold text-gray-950">
                Male
              </span>
              <input
                checked={inputData.gender === "male"}
                onChange={() => selectGender("male")}
                type="checkbox"
                className="checkbox checkbox-info"
              />
            </label>
            <label className="cursor-pointer label flex gap-2">
              <span className="label-text font-semibold text-gray-950">
                Female
              </span>
              <input
                checked={inputData.gender === "female"}
                onChange={() => selectGender("female")}
                type="checkbox"
                className="checkbox checkbox-info"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 self-center w-auto px-2 py-1 bg-gray-950 text-lg text-white rounded-lg hover:scale-105 hover:bg-gray-900"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <div className="pt-2">
          <p className="text-sm font-semibold text-gray-800">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gray-950 font-bold underline cursor-pointer hover:text-gray-50"
              aria-label="Register for a new account"
            >
              Login Now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
