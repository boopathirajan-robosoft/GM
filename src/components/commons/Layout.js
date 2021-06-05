import * as React from "react";
import { View } from "react-native";
import { Header } from "./Header";

const Layout = (props) => {
  return (
    <View>
      <Header />
      {props.children}
    </View>
  );
};

export default Layout;
export { Layout };
