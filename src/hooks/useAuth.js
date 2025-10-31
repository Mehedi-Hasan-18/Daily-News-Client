import { useEffect, useState } from "react";
import apiClient from "../Services/apiClient";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("authToken");
    return token ? JSON.parse(token) : null;
  };

  const [authToken, setAuthToken] = useState(getToken());

  useEffect(() => {
    if (authToken) fetchUserProfile();
  }, [authToken]);

  // Handle Error
  const handleAPIError = (
    error,
    defaultMessage = "Something Went Wrong! Try Again"
  ) => {
    console.log(error);

    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
      return { success: false, message: errorMessage };
    }
    setErrorMsg(defaultMessage);
    return {
      success: false,
      message: defaultMessage,
    };
  };

  //   FetchUser
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("/auth/users/me/", {
        headers: { Authorization: `JWT ${authToken?.access}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log("Authorization Error", error);
    }
  };

  //Update user
  const updateUserProfile = async (data) => {
    setErrorMsg("");
    try {
      apiClient.put("auth/users/me/", data, {
        headers: { Authorization: `JWT ${authToken?.access}` },
      });
    } catch (error) {
      setErrorMsg(error);
    }
  };

  //Change Password
  const changePassword = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("auth/users/set_password/", data, {
        headers: { Authorization: `JWT ${authToken?.access}` },
      });
    } catch (error) {
      return handleAPIError(error);
    }
  };

  //   Login User
  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      setAuthToken(response.data);
      console.log(response.data)
      localStorage.setItem("authToken", JSON.stringify(response.data));
      // After Log IN set User
      await fetchUserProfile();
    } catch (error) {
      setErrorMsg(error.response.data?.details);
    }
  };

  // Register User

  const registerUser = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", data);
      console.log(data);
      return {
        success: true,
        message:
          "Registration successfull. Check your email to activate your account.",
      };
    } catch (error) {
      return handleAPIError(error);
    }
  };

  //LogOut
  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("cartId");
  };

  return {
    user,
    errorMsg,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    changePassword,
  };
};

export default useAuth;
