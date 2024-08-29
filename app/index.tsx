import SplashScreen from "../components/screens/SplashScreen";
import { Redirect } from "expo-router";

import React, { useEffect, useState } from "react";

type Props = {};

const Screen = (props: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);
  return (
    <>
      <Redirect href={"/(auth)/landing"} />
    </>
  );
};

export default Screen;
