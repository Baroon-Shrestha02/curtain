import api from "./BaseApi";

// GET /settings → site contact + socials
export const getSettings = async () => {
  const { data } = await api.get("/settings");
  return data?.data ?? null;
};
