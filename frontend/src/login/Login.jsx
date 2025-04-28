import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


function Login() {
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({});
    const [loading, setloading] = useState(false);
    const {setAuthUser} = useAuth();

    const handleInput = (e) => {
        setUserInput(({
            ...userInput, [e.target.id] : e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const res = await axios.post("/api/auth/login", userInput);
            const data = res.data;

            if(data.success === false) {
                setloading(false);
                console.log(data.message);
                return;
            }

            toast.success(data.message);
            localStorage.setItem('Chatapp', JSON.stringify(data));
            setAuthUser(data);
            setloading(false);
            navigate('/');
        } catch (error) {
            setloading(false);
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    console.log(userInput);
    
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
          </div>
          <button
            type="submit"
            className="mt-4 self-center w-auto px-2 py-1 bg-gray-950 text-lg text-white rounded-lg hover:scale-105 hover:bg-gray-900"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="pt-2">
          <p className="text-sm font-semibold text-gray-800">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-gray-950 font-bold underline cursor-pointer hover:text-gray-50"
              aria-label="Register for a new account"
            >
              Register Now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
