export function getStyles(WIDTH) {
  return {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
      paddingLeft: "20px",
      width: WIDTH,
      height: "35px",
    }),
    input: (styles) => ({
      ...styles,
      color: "rgb(251, 251, 251)",
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      height: "35px",
    }),
    valueContainer: (styles) => ({
      ...styles,
      paddingLeft: "0",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "rgb(251, 251, 251)",
    }),
    menuList: (styles) => {
      return {
        ...styles,
        borderRadius: "8px",
        boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(100px)",
        background:
          "linear-gradient(0.00deg, rgba(83, 61, 186, 0.7),rgba(80, 48, 154, 0.7) 43.139%,rgba(106, 70, 165, 0.52) 73.27%,rgba(133, 93, 175, 0.13) 120.028%)",
      };
    },
    placeholder: (styles) => ({
      ...styles,
      color: "rgba(255, 255, 255, 0.6)",
      fontFamily: "Poppins",
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "1.5",
      letterSpacing: "0%",
      textAlign: "left",
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "rgb(251, 251, 251)",
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: "none",
    }),
  };
}
