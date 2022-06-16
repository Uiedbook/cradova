import _ from "../../../../index.js";

const Input = ({ placeholder, credentials, field, type }) => {
  return _("input.input", {
    onchange() {
      const file = type === "file" ? this.files[0] : 0;
      if (file) {
        let newSave = credentials.get();
        newSave[field] = file;
        credentials.set(newSave);
      }
    },
    oninput: (e) => {
      let newSave = credentials.get();
      newSave[field] = e.target.value;
      credentials.set(newSave);
    },
    style: {
      minHeight: placeholder ? "40px" : "auto",
      minWidth: placeholder ? "26auto" : "100%",
      border: placeholder ? "2px solid white" : "auto",
      width: placeholder ? "80%" : "auto",
      marginLeft: placeholder ? "10px" : "auto",
      backgroundColor: placeholder ? "#dde1e7" : "transparent",
      borderColor: "whitesmoke",
      marginBottom: placeholder ? "10px" : "auto",
      borderRadius: placeholder ? "12px" : "0px",
      fontSize: placeholder ? "16px" : "14px",
      textAlign: "left",
      padding: "10px",
      color: placeholder ? "#656669" : "transparent",
    },
    placeholder: placeholder ? placeholder : "",
    type: type ? type : "text",
    value: type !== "file" ? credentials.get()[field] : null,
  });
};
export default Input;
