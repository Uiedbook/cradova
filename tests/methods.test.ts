import { Ref, header, h1 } from "../dist";

type dataType = { year: string; age: string };

const Header = new Ref<dataType>(function (data = { year: "2023", age: "2" }) {
  return header(h1("Cradova is " + data.age + " yrs old in " + data.year));
});

Header.define("increase", function (isNewYear) {
  if (isNewYear) {
    this.updateState({ year: "2024", age: "3" });
  }
});
document.body.appendChild(Header.render());
Header.methods.increase(true);
