import React, { useEffect } from "react";
import { useState } from "react";
import Heading from "./Heading";
import axios from "axios";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import toast from "react-hot-toast";
import { baseApiURL } from "../baseUrl";
const Queries = () => {
  const router = useLocation();
  const [queries, setQueries] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
    type: "faculty",
  });

  const getQueriesHandler = () => {
    let data = {};
    if (router.pathname.replace("/", "") === "faculty") {
      data = {
        type: ["faculty", "both"],
      };
    } else {
      data = {
        type: ["both", "faculty","parent"],
      };
    }
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/queries/getQueries`, data, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setQueries(response.data.queries);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    let data = {};
    if (router.pathname.replace("/", "") === "faculty") {
      data = {
        type: ["faculty", "both"],
      };
    } else {
      data = {
        type: ["both", "faculty","parent"],
      };
    }
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/queries/getQueries`, data, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setQueries(response.data.queries);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  }, [router.pathname]);

  const addQuerieshandler = (e) => {
    e.preventDefault();
    toast.loading("Adding Query");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/queries/addQueries`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getQueriesHandler();
          setOpen(!open);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const deleteQuerieshandler = (id) => {
    toast.loading("Deleting Query");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .delete(`${baseApiURL()}/queries/deleteQueries/${id}`, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getQueriesHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const updateQuerieshandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/queries/updateQueries/${id}`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getQueriesHandler();
          setOpen(!open);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const setOpenEditSectionHandler = (index) => {
    setEdit(true);
    setOpen(!open);
    setData({
      title: queries[index].title,
      description: queries[index].description,
      type: queries[index].type,
    });
    setId(queries[index]._id);
  };

  const openHandler = () => {
    setOpen(!open);
    setEdit(false);
    setData({ title: "", description: "", type: "faculty, parent"});
  };

  return (
    <div className="w-[85%] mx-auto flex justify-center items-start flex-col my-10">
      <div className="relative flex justify-between items-center w-full">
        <Heading title="Queries" />
        {(router.pathname === "/parent") &&
          (open ? (
            <button
              className="absolute right-2 flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded text-red-500"
              onClick={openHandler}
            >
              <span className="mr-2">
                <BiArrowBack className="text-red-500" />
              </span>
              Close
            </button>
          ) : (
            <button
              className="absolute right-2 flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded text-red-500"
              onClick={openHandler}
            >
              Add Query
              <span className="ml-2">
                <IoAddOutline className="text-red-500 text-xl" />
              </span>
            </button>
          ))}
      </div>
      {!open && (
        <div className="mt-8 w-full">
          {queries &&
            queries.map((item, index) => {
              return (
                <div
                  key={item._id}
                  className="border-blue-500 border-2 w-full rounded-md shadow-sm py-4 px-6 mb-4 relative"
                >
                  {(router.pathname === "/parent") && (
                    <div className="absolute flex justify-center items-center right-4 bottom-3">
                      <span className="text-sm bg-blue-500 px-4 py-1 text-white rounded-full">
                        {item.type}
                      </span>
                      <span
                        className="text-2xl group-hover:text-blue-500 ml-2 cursor-pointer hover:text-red-500"
                        onClick={() => deleteQuerieshandler(item._id)}
                      >
                        <MdDeleteOutline />
                      </span>
                      <span
                        className="text-2xl group-hover:text-blue-500 ml-2 cursor-pointer hover:text-blue-500"
                        onClick={() => setOpenEditSectionHandler(index)}
                      >
                        <MdEditNote />
                      </span>
                    </div>
                  )}
                  <p
                    className={`text-xl font-medium flex justify-start items-center ${
                      item.link && "cursor-pointer"
                    } group`}
                    onClick={() => item.link && window.open(item.link)}
                  >
                    {item.title}
                    {item.link && (
                      <span className="text-2xl group-hover:text-blue-500 ml-1">
                        <IoMdLink />
                      </span>
                    )}
                  </p>
                  <p className="text-base font-normal mt-1">
                    {item.description}
                  </p>
                  <p className="text-sm absolute top-4 right-4 flex justify-center items-center">
                    <span className="text-base mr-1">
                      <HiOutlineCalendar />
                    </span>
                    {item.createdAt.split("T")[0].split("-")[2] +
                      "/" +
                      item.createdAt.split("T")[0].split("-")[1] +
                      "/" +
                      item.createdAt.split("T")[0].split("-")[0] +
                      " " +
                      item.createdAt.split("T")[1].split(".")[0]}
                  </p>
                </div>
              );
            })}
        </div>
      )}
      {open && (
        <form className="mt-8 w-full">
          <div className="w-[40%] mt-2">
            <label htmlFor="title">Query Title</label>
            <input
              type="text"
              id="title"
              className="bg-blue-50 py-2 px-4 w-full mt-1"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="title">Query Description</label>
            <textarea
              id="title"
              cols="30"
              rows="4"
              className="bg-blue-50 py-2 px-4 w-full mt-1 resize-none"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="type">Type Of Query</label>
            <select
              id="type"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] accent-blue-700 mt-4"
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value })}
            >
              <option value="faculty">Faculty</option>
              <option value="parent">Parent</option>
              <option value="both">Both</option>
            </select>
          </div>
          {edit && (
            <button
              onClick={updateQuerieshandler}
              className="bg-blue-500 text-white mt-6 px-6 rounded text-lg py-2 hover:bg-blue-600"
            >
              Update Query
            </button>
          )}
          {!edit && (
            <button
              onClick={addQuerieshandler}
              className="bg-blue-500 text-white mt-6 px-6 rounded text-lg py-2 hover:bg-blue-600"
            >
              Add Query
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default Queries;
