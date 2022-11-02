# ts-virtualize

Virtualize an interface.

```ts
console.log(virtualize<{ name: string }>().name);
// name
console.log(virtualize<{ people: { name: string } }>().people.name);
// people.name
```

Can use by `react-hook-form` or `antd form item` to improve static type checking.

- https://react-hook-form.com/zh/api/#setValue
- https://ant.design/components/form/#NamePath

## Usage

```sh
npm i -S ts-virtualize
```

```ts
import { virtualize } from "ts-virtualize";

interface People {
  name: string;
  age: number;
  wife: {
    name: string;
    age: number;
  };
  children: Array<{
    name: string;
    age: number;
  }>;
}

const virtualPeople = virtualize<People>();

console.log(`${virtualPeople.name}`); // name
console.log(`${virtualPeople.wife.name}`); // wife.name
console.log(virtualPeople.children[0].name + '') // children[0].name
console.log(virtualToString(virtualPeople.children[0].age)) // children[0].age

// set root path
const virtualRootPeople = virtualize<People>({ root: 'people' });
console.log((`${virtualPeople.name}`); // people.name

// export as path array
const virtualArrayPeople = virtualize<People>();
console.log(virtualToArray(virtualPeople.wife.name) // ['wife', 'name']
```

## Functions

- virtualize
  - main func
- virtualToString, default
  - get path as string
- virtualToArray
  - get path as array

## Tests

- [index](/test/index.test.ts)

## Deps

Attention for compatibility

- ES6 Symbol
- ES6 Proxy

# ts-virtualize
