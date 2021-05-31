import * as React from "react";
import { View } from "react-native";
import { Header } from "./Header";

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
export { Layout };
