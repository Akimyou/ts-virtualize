const exportDefault = (props: string[]) => {
  return props
    .map((_, idx) => {
      if (!isNaN(parseInt(_))) {
        return `[${_}]`;
      } else {
        return idx === 0 ? _ : `.${_}`;
      }
    })
    .join("");
};

const exportArray = (props: string[]) => {
  return props
    .filter((_) => _)
    .map((_) => (!isNaN(parseInt(_)) ? parseInt(_) : _));
};

const reservedProps = [Symbol.toPrimitive, "toString", "toArray"];

export const virtualize = <T>(root?: string): T => {
  const symbolProps = Symbol("symbolProps");
  const getStore = () => {
    return {
      [symbolProps]: root ? [root] : [],
      [Symbol.toPrimitive]() {
        return exportDefault(this[symbolProps]);
      },
      toString() {
        return exportDefault(this[symbolProps]);
      },
      toArray() {
        return exportArray(this[symbolProps]);
      },
    };
  };

  const store: any = getStore();

  const handler = {
    get(target: any, prop: any): any {
      if (!reservedProps.includes(prop)) {
        store[symbolProps].push(prop);
      } else {
        const resultStore = getStore();
        resultStore[symbolProps] = [...store[symbolProps]];
        store[symbolProps] = getStore()[symbolProps];
        return store[prop].bind(resultStore);
      }
      return new Proxy(store, handler);
    },
  };

  const result = new Proxy(store, handler);
  return result;
};

export const virtualToString = (obj: any): string => {
  return obj.toString();
};

export const virtualToArray = (obj: any): Array<string | number> => {
  return obj.toArray();
};
