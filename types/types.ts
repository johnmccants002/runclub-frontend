import { ImageSourcePropType } from "react-native";

export interface Announcement {
  _id: string;
  user: string;
  title: string;
  content: string;
  imageUrl: string | ImageSourcePropType;
  createdAt: string;
}

export interface UserProfile {
  about: string;
  favoriteBrunchSpot: string;
  instagram: string;
  phoneNumber: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profile: UserProfile;
  isMember: boolean;
  membershipStatus: "accepted" | "denied" | "pending";
}

export interface CreateAnnouncementInput {
  title: string;
  content: string;
  imageUrl?: string; // Optional field
  userId: string;
}
export interface Event {
  _id: string;
  createdBy: string;
  title: string;
  details: string;
  startTime: string;
  endTime: string;
  photo?: string;
  createdAt: string;
}

export interface CreateEventInput {
  title: string;
  details: string;
  startTime: string;
  endTime: string;
  photo?: string;
  createdBy: string;
}
