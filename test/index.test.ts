import { People } from "./interface";
import { virtualize, virtualToString, virtualToArray } from "../src/lib";

test("default", () => {
  const virtualPeople = virtualize<People>();
  expect(`${virtualPeople.name}`).toBe("name");
  expect(`${virtualPeople.wife.name}`).toBe("wife.name");
  expect(virtualPeople.children[0].name + '').toBe("children[0].name");
  expect(virtualPeople.children[0].age + '').toBe("children[0].age");

  expect(virtualToString(virtualPeople.name)).toBe("name");
  expect(virtualToString(virtualPeople.wife.name)).toBe("wife.name");
  expect(virtualToArray(virtualPeople.name).join('.')).toBe('name');
  expect(virtualToArray(virtualPeople.wife.name).join('.')).toBe('wife.name');
  expect(virtualToArray(virtualPeople[0]).join('.')).toBe('0');
});

test("default width root", () => {
  const virtualPeople = virtualize<People>("people");
  expect(`${virtualPeople.name}`).toBe("people.name");
  expect(`${virtualPeople.wife.name}`).toBe("people.wife.name");
  expect(`${virtualPeople.children[0].name}`).toBe("people.children[0].name");
  expect(`${virtualPeople.children[0].age}`).toBe("people.children[0].age");
});
