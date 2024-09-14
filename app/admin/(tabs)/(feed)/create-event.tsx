import CreateEventScreen from "@/components/screens/CreateEventScree";
import { useSegments } from "expo-router";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const segments = useSegments();
  console.log(segments, "CURRENT SEGMENTS");
  return <CreateEventScreen />;
};

export default Page;
