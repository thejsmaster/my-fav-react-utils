import { useCallback, useState } from "react";

interface UseList<T> {
  addItem: (item: T, index?: number) => void;
  updateItem: (item: T, index?: number) => void;
  removeItem: (index: number) => void;
  list: T[];
}

export function useArray<T>(initialList: T[] = []): UseList<T> {
  const [list, setList] = useState<T[]>(initialList);

  // Function to add an item to the list at a specific index or at the end if no index is provided
  const updateItem = (item: T, index: number = list.length) => {
    if (index < 0 || index > list.length) {
      throw new Error("Invalid index");
    }

    const updatedList = [...list];
    updatedList.splice(index, 0, item);
    setList(updatedList);
  };

  // Function to remove an item from the list at a specific index
  const removeItem = (index: number) => {
    if (index < 0 || index >= list.length) {
      throw new Error("Invalid index");
    }

    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  return {
    addItem: updateItem,
    updateItem,
    removeItem,
    list: [...list], // Return a copy of the list to ensure immutability
  };
}

export function useString(initialValue = "") {
  const [val, setVal] = useState(initialValue);

  const isEmpty = () => {
    return val !== "" && val !== null && val !== undefined;
  };

  const isNull = () => {
    return val === null;
  };

  const isUndefined = () => {
    return val === undefined;
  };

  const toInt = () => {
    return parseInt(val);
  };

  const toFloat = (precision = 2) => {
    return parseFloat(val).toFixed(precision);
  };

  const toIntOrZero = () => {
    return isNaN(parseInt(val)) ? 0 : parseInt(val);
  };

  const toFloatOrZero = (precision = 2) => {
    return isNaN(parseFloat(val))
      ? parseFloat("0").toFixed(precision)
      : parseFloat(val).toFixed(precision);
  };

  return {
    val,
    setVal,
    isEmpty,
    isNull,
    isUndefined,
    toInt,
    toFloat,
    isNaN,
    toIntOrZero,
    toFloatOrZero,
  };
}

export function useFloat(initialValue = 0, precision = 2) {
  const [val, setValInternal] = useState(
    parseFloat(initialValue.toString()).toFixed(precision)
  );

  const setVal = (newValue: any) => {
    const parsedValue = parseFloat(newValue);
    if (isNaN(parsedValue)) {
      setValInternal(parseFloat("0").toFixed(precision));
    } else {
      setValInternal(parsedValue.toFixed(precision));
    }
  };

  const sum = useCallback(
    (value: any) => {
      setVal((parseFloat(val) + parseFloat(value)).toFixed(precision));
    },
    [val, precision]
  );

  const subtract = useCallback(
    (value: any) => {
      setVal((parseFloat(val) - parseFloat(value)).toFixed(precision));
    },
    [val, precision]
  );

  const multiply = useCallback(
    (value: any) => {
      setVal((parseFloat(val) * parseFloat(value)).toFixed(precision));
    },
    [val, precision]
  );

  const divide = useCallback(
    (value: any) => {
      if (parseFloat(value) === 0) {
        setVal(parseFloat("0").toFixed(precision));
      } else {
        setVal((parseFloat(val) / parseFloat(value)).toFixed(precision));
      }
    },
    [val, precision]
  );

  const toInt = () => {
    return parseInt(val);
  };

  const toIntFloor = () => {
    return Math.floor(parseFloat(val));
  };

  const toIntCeil = () => {
    return Math.ceil(parseFloat(val));
  };

  const toIntRound = () => {
    return Math.round(parseFloat(val));
  };

  return {
    val,
    sum,
    subtract,
    multiply,
    divide,
    setVal,
    toInt,
    toIntFloor,
    toIntCeil,
    toIntRound,
  };
}

export function xInt(num: number) {
  return {
    sum: (other: number) => num + other,
    subtract: (other: number) => num - other,
    multiply: (other: number) => num * other,
  };
}

export function xFloat(num: number, precision = 2) {
  const roundedNum = parseFloat(num.toFixed(precision));
  return {
    sum: (other: number) => {
      const result = roundedNum + other;
      return parseFloat(result.toFixed(precision));
    },
    subtract: (other: number) => {
      const result = roundedNum - other;
      return parseFloat(result.toFixed(precision));
    },
    multiply: (other: number) => {
      const result = roundedNum * other;
      return parseFloat(result.toFixed(precision));
    },
  };
}

interface UseObject<T> {
  setItem: (key: string, value: T) => void;
  getItem: (key: string) => T | undefined;
  removeItem: (key: string) => void;
  hasKey: (key: string) => boolean;
  object: Record<string, T>;
  keys: string[];
}

export function useObject<T>(
  initialObject: Record<string, T> = {}
): UseObject<T> {
  const [object, setObject] = useState(initialObject);

  const setItem = (key: string, value: T) => {
    setObject((prevObject) => ({ ...prevObject, [key]: value }));
  };

  const getItem = (key: string) => {
    return object[key];
  };

  const removeItem = (key: string) => {
    setObject((prevObject) => {
      const updatedObject = { ...prevObject };
      delete updatedObject[key];
      return updatedObject;
    });
  };

  const hasKey = (key: string) => {
    return key in object;
  };

  const keys = Object.keys(object);

  return {
    setItem,
    getItem,
    removeItem,
    hasKey,
    object,
    keys,
  };
}

export function paginateArray<T>(
  array: T[],
  currentPage: number,
  itemsPerPage: number
): T[] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
}
