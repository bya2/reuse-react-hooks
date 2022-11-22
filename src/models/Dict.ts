class Dict {
  static from<T extends object = any, K extends keyof T = any>(list: K[], value: T[K]) {
    return list.reduce((obj, t) => ((obj[t] = value), obj), {} as T);
  }

  static upserted<T extends object, K extends keyof T = any>(key: K, value: T[K]): (dict: T) => T {
    return (dict: T): T => ({
      ...dict,
      [key]: value,
    });
  }

  static removed<T extends object, K extends keyof T = any>(key: K): (dict: T) => T {
    return (dict: T): T => {
      const { [key]: _, ...rest } = dict;
      return rest as T;
    };
  }
}

export default Dict;
