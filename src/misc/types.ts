export type TOrU<T> = T | undefined;
export type TOrN<T> = T | null;

export type TPromise<P extends Promise<any>> = P extends Promise<infer T> ? T : never;
export type TAsyncFunction = (...args: any[]) => Promise<any>;

export type Dispatch<A> = (action: A) => void;