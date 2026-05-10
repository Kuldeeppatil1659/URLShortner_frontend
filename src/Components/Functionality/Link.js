import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link as RouterLink } from "react-router-dom"; // Importing Link from react-router-dom
import { fetchLinks, sendLinkBackend } from "../../Api/Main";
import { useDispatch, useSelector } from "react-redux";
import { setResponseStorage } from "../../Slices/Links";
import Display from "./Display";

const Link = () => {
  const dispatch = useDispatch();
  const [link, setLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [show, setShow] = useState(false);
  const [refreshLinks, setRefreshLinks] = useState(false); // New state for refresh trigger

  const { username, _id } = useSelector(
    (state) => state.userProfile?.user || { username: "Guest", _id: null }
  );
  // const responseStorage = useSelector(
  //   (state) => state.responseStorage?.responseStorage
  // );

  const payload = { createdBy: username, userId: _id };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetchLinks({ userId: _id });
        console.log(response.data.data);
        dispatch(setResponseStorage(response.data.data));
        if (response.data.success) {
          console.log("User is authenticated");
          setShow(true); // User is authenticated
        } else {
          setShow(false); // User is not authenticated
        }
      } catch (error) {
        console.error("Error validating authentication:", error);
        setShow(false); // Default to not authenticated on error
      }
    };

    checkAuth();
  }, [dispatch, _id, refreshLinks]); // Add refreshLinks as a dependency

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!link) {
      toast.error("Please enter a valid link.");
      return;
    }
    try {
      const response = await sendLinkBackend({ link, payload });
      console.log(response.data);
      console.log(process.env.REACT_APP_API_URL);
      setShortLink(`${process.env.REACT_APP_API_URL}/${response.data.data}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        setRefreshLinks((prev) => !prev); // Trigger refresh of links
      } else if (response.status === 400) {
        toast.error(response.data.message);
      } else if (response.status === 500) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      {" "}
      <div className="hero ">
        <div className="card w-full max-w-md bg-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center text-gray-800">
              Enter Your Link Below
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <input
                type="url"
                placeholder="Enter your link (https://example.com)"
                className="input input-bordered w-full"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary w-full">
                Submit Link
              </button>
              {shortLink && (
                <div className="text-sm text-gray-500 text-center mt-4">
                  Short Link:{" "}
                  <a
                    href={`${shortLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortLink}
                  </a>
                </div>
              )}
              {!show && (
                <div className="text-sm text-gray-500 text-center mt-4">
                  Need more features?{" "}
                  <RouterLink
                    to="/register"
                    className="text-primary font-semibold"
                  >
                    Sign up now!
                  </RouterLink>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      {show && <Display type="link" />}
    </>
  );
};

export default Link;
