import { BASE_URL } from "@/constants";
import axios from "@/middleware/axios";
import useAuthStore from "@/stores/auth";

export const sendNewUserNotification = async (
  firstName: String,
  lastName: String
) => {
  const token = useAuthStore.getState().token;
  const body = { firstName: firstName, lastName: lastName };

  try {
    const { data } = await axios.post(
      `${BASE_URL}/notifications/new-member`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};
