export interface People {
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
  0: string,
}
