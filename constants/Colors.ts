/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  primary: {
    primary: "#3D38ED",
    primaryMuted: "#C9C8FA",
    background: "#F5F5F5",
    dark: "#141518",
    gray: "#626D77",
    lightGray: "#D8DCE2",
  },
};

export const palette = {
  lightBlue: "#1a8cc7",
  darkBlue: "#0077b6",
  mainBlue: "#008dcf",
  gray: "#7b8c98", // A cool medium gray that balances well with the blues.
  white: "#ffffff", // Pure white for contrast and brightness.
  offWhite: "#f4f4f4", // A very light gray, nearly white, for subtle differentiation.
  darkCharcoal: "#343a40", // A dark charcoal gray, almost black, for strong contrast.
};
