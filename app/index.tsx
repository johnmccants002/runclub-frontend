import { Redirect } from "expo-router";

import React, { useEffect, useState } from "react";

type Props = {};

const Screen = (props: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);
  return <Redirect href={"/(tabs)/"} />;
};

export default Screen;
