import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import userConversation from "../zustans/useConversation";
import { useSocketContext } from "../context/SocketContext";

function Sidebar({ onSelectUser }) {
  const [inputSearch, setInputSearch] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatUser, setChatUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();
  const { messages, selectedConversation, setSelectedConversation } =
    userConversation();
  const { onlineUser, socket } = useSocketContext();

  const nowOnline = chatUser.map((user) => user._id);

  const isOnline = nowOnline.map((userId) => onlineUser.includes(userId));

  useEffect(() => {
    const chatUserHandler = async () => {
      setLoading(true);
      try {
        const chatters = await axios.get("/api/user/currentchatters");
        const data = chatters.data;

        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
          return;
        }

        setLoading(false);
        setChatUser(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    chatUserHandler();
  }, []);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`/api/user/search?search=${inputSearch}`);

      const data = res.data;

      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
        return;
      }

      setLoading(false);
      if (data.length === 0) {
        toast.info("User Not Found");
      } else {
        setSearchUser(data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUserClick = (user) => {
    onSelectUser(user);
    setSelectedConversation(user);
    setSelectedUserId(user._id);
  };

  const handleSearchBack = () => {
    setSearchUser([]);
    setInputSearch("");
  };

  const handleLogout = async () => {
    const confirmLogout = window.prompt("type 'UserName' to LOGOUT: ");
    if (confirmLogout === authUser.username) {
      setLoading(true);
      try {
        const logout = await axios.post("api/auth/logout");
        const data = logout.data;
        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
          return;
        }

        toast.info(data.message);
        localStorage.removeItem("Chatapp");
        setAuthUser(null);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      toast.info("Logout Cancelled");
    }
  };

  return (
    <div className="h-full w-auto px-1">
      <div className="flex justify-between gap-2">
        <form
          onSubmit={handleSubmitForm}
          className="w-auto flex items-center justify-between bg-white rounded-full"
        >
          <input
            onChange={(e) => setInputSearch(e.target.value)}
            value={inputSearch}
            type="text"
            placeholder="Search User"
            className="px-4 w-auto bg-transparent text-black outline-none rounded-full"
          />
          <button className="btn btn-circle bg-sky-700 hover:bg-gray-950">
            <FaSearch />
          </button>
        </form>
        <img
          src={authUser?.profilePic}
          className="self-center h-12 w-12 hover:scale-110 cursor-pointer"
          onClick={() => navigate(`/profile/${authUser?._id}`)}
        />
      </div>
      <div className="divider px-3"></div>
      {searchUser?.length > 0 ? (
        <>
          <div className="min-h-[70%] max-h-[80%] m overflow-y-auto scrollbar">
            <div className="w-auto">
              {searchUser.map((user, index) => (
                <div key={user._id}>
                  <div
                    onClick={() => handleUserClick(user)}
                    className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer ${
                      selectedUserId === user?._id ? "bg-sky-500" : ""
                    }`}
                  >
                    <div className={`avatar`}>
                      <div className="w-12 rounded-full h-12">
                        <img src={user.profilePic} alt="user.img" />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <p className="font-bold text-gray-950">{user.fullname}</p>
                    </div>
                  </div>
                  <div className="divider divide-solid px-3 h-[1px]"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto px-1 py-1 flex">
            <button
              onClick={handleSearchBack}
              className="bg-black rounded-lg px-2 py-1 self-center hover:cursor-pointer"
            >
              <IoArrowBackSharp size={25} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-[70%] max-h-[80%] m overflow-y-auto scrollbar">
            <div className="w-auto">
              {chatUser.length === 0 ? (
                <>
                  <div className="font-bold items-center flex flex-col text-xl text-yellow-500">
                    <h1>Why are you alone!!</h1>
                    <h1>Search User to chat</h1>
                  </div>
                </>
              ) : (
                <>
                  {chatUser.map((user, index) => (
                    <div key={user._id}>
                      <div
                        onClick={() => handleUserClick(user)}
                        className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer ${
                          selectedUserId === user?._id ? "bg-sky-500" : ""
                        }`}
                      >
                        <div
                          className={`avatar`}
                        >
                          <div className="w-12 rounded-full h-12">
                            <img src={user.profilePic} alt="user.img" />
                          </div>
                        </div>
                        <div className="flex flex-col flex-1">
                          <p className="font-bold text-gray-950">
                            {user.fullname}
                          </p>
                        </div>

                      </div>
                      <div className="divider divide-solid px-3 h-[1px]"></div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="mt-auto px-1 py-1 flex">
            <button
              onClick={handleLogout}
              className="hover:bg-red-600 w-10 pointer-cursor hover:text-white rounded-lg"
            >
              <BiLogOut size={25} />
            </button>
            <p className="text-small py-1">Logout</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
