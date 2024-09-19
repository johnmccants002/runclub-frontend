import { Slot } from "expo-router";
import React from "react";
import { useNotificationObserver } from "@/hooks/useNotificationObserver";

type Props = {};

const Layout = (props: Props) => {
  useNotificationObserver();

  return <Slot />;
};

export default Layout;
