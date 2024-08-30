import { ImageSourcePropType } from "react-native";

export interface Announcement {
  _id: string;
  user: string;
  title: string;
  content: string;
  imageUrl: string | ImageSourcePropType;
  createdAt: string;
}
