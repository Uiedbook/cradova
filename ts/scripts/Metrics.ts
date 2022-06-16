const { innerWidth, innerHeight } = window;
const height = innerHeight;
const width = innerWidth;

const metrics = {
  // global sizes
  base: "8px",
  font: "14px",
  radius: "20px",
  padding: "24px",
  large: "40px",
  big: "32px",
  small: "24px",

  s5: "5px",
  s8: "8px",
  s10: "10px",
  s16: "16px",
  s20: "20px",
  s30: "30px",
  s40: "40px",
  s50: "50px",
  s60: "60px",

  // font sizes
  h1: "30px",
  h2: "24px",
  h3: "20px",
  h4: "16px",
  h5: "14px",
  h6: "13px",
  body1: "30px",
  body2: "22px",
  body3: "16px",
  body4: "14px",
  body5: "13px",
  body6: "12px",

  borderWidth: "0.4px",

  horizontalLineHeight: "1px",

  screenWidth: width < height ? width + "px" : height + "px",
  screenHeight: width < height ? height + "px" : width + "px",
  drawerWidth: (3 / 4) * width + "px",
  navBarHeight: "60px",

  buttonRadius: "4px",

  icons: {
    tiny: "15px",
    small: "20px",
    medium: "30px",
    large: "45px",
    xl: "50px",
  },

  images: {
    small: "20px",
    medium: "40px",
    large: "60px",
    logo: "200px",
  },
};

export default metrics;
