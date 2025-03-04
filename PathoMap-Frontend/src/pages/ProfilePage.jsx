import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Profile() {
  const { formData } = useContext(UserContext);
  
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/new-user/${formData.username}`);
  };

  return (
    <>
      <div>
        <button onClick={handleNavigate}>Click to update profile</button>
      </div>
    </>
  );
}