import { createContext, useEffect, useMemo, useState } from "react";
import { getUserInfo } from "../api/usersAPI";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [userInfo, setUserInfo] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    setUserToken(null);
    setUserData(null);
  };

  const handleToken = (token, username) => {
    localStorage.setItem("userToken", token);
    localStorage.setItem("username", username);
    // setUserToken(token);
    setUserData({ username });  
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && !userToken) {
      setUserToken(storedToken);
      setUserData({ username: storedUsername }); 
    }
  }, []);


  const username = localStorage.getItem("username")
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (username && userToken) {
        try {
          const info = await getUserInfo(username, userToken);
          localStorage.setItem("userProfile", JSON.stringify(info))
          setUserInfo(info);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };
    fetchUserInfo();
  }, [username, userToken]);



  const value = useMemo(
    () => ({
      userToken,
      userData,
      handleLogout,
      handleToken,
      formData,
      handleFormDataChange,
      userInfo,
      setUserInfo
    }),
    [userToken, userData, formData]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;