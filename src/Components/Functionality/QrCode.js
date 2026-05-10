import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { sendQrCodeLinksBackend, fetchQrCodes } from "../../Api/Main";
import { useSelector, useDispatch } from "react-redux";
import { setResponseStorage } from "../../Slices/Links";
import Display from "./Display";

const QrCode = () => {
  const [link, setLink] = useState("");
  const [show, setShow] = useState(false);
  const [refreshLinks, setRefreshLinks] = useState(false);
  const dispatch = useDispatch();
  const { username, _id } =
    useSelector((state) => state.userProfile?.user) || {};

  const payload = { createdBy: username, userId: _id };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetchQrCodes({ userId: _id });
        console.log(response.data.data);
        dispatch(setResponseStorage(response.data.data));
        setShow(response.data.success); // Show based on success
      } catch (error) {
        console.error("Error validating authentication:", error);
        setShow(false);
      }
    };

    checkAuth();
  }, [dispatch, _id, refreshLinks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!link) {
      toast.error("Please enter a valid link.");
      return;
    }

    try {
      console.log(link); // Ensure link is preserved
      const response = await sendQrCodeLinksBackend({ payload, link });

      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(setResponseStorage(response.data.data));
        setRefreshLinks(!refreshLinks); // Trigger re-fetch
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while generating the QR code.");
    }
  };

  return (
    <>
      <div className="hero">
        <div className="card w-full max-w-md bg-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center text-gray-800">
              Enter Your Link Below to Generate QR Code
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
            </form>
          </div>
        </div>
      </div>
      {show && <Display type="qr" />}
    </>
  );
};

export default QrCode;
