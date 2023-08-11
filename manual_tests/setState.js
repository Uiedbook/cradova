import _, { button, useState, css, Ref } from "../dist/index.js";

const useStateButton = new Ref(function () {
  const [s1, setS1] = useState(0, this);
  setTimeout(() => {
    setS1(s1 + 1);
  }, 999);
  return button(
    String(
      "hr: " +
        (s1 > 3600 ? Math.floor(s1 / 24) : 0) +
        "  min:" +
        (s1 > 60 ? Math.floor(s1 / 60) : 0) +
        "   sec:" +
        (s1 % 60)
    )
  );
});
document.body.appendChild(useStateButton.render());
css`
  body {
    display: flex;
    height: 100vh;
  }

  button {
    padding: 5rem;
    margin: auto;
  }
`;
