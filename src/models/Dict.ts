class Dict {
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
