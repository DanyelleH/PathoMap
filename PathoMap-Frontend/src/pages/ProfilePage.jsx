import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Profile() {
  const {userToken } = useContext(UserContext)
  const navigate = useNavigate();

    const username = localStorage.getItem("userToken")

  const handleNavigate = () => {
    navigate(`/new-user/${username}`);
  };
  console.log(userToken,)
  return (
    <>
      <div>
        <button onClick={handleNavigate}>Click to update profile</button>
      </div>
    </>
  );
}