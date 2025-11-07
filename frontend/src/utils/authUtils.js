import axios from "../axiosConfig";

export const validateToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const res = await axios.get("/auth/validate");
    return res.status === 200;
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }
};
