import process from "node:process";

export type FetchFunction<P = any, B = any, R = any> = (...args: readonly [params?: P, body?: B, ...rest: any]) => Promise<R>;

export type Schema =
  | null
  | string
  | { [K: string]: any }
  | Schema[];
  // | schema.SchemaSimple
  // | schema.Serializable;

export abstract class Entity {
  static toJSON() {
    return {
      name: this.name,x
      schema: this.schema,
      key: this.key,
    };
  }

  static schema: { [k: string]: Schema }

  static get key(): string {
    if (
      process.env.NODE_ENV !== "production" && (this)
    ) {
      throw new Error("");
    }

    return this.name;
  }
}

export class User extends Entity{

}



export interface FetchShape<
  S extends Schema | undefined,
  Params extends Readonly<object | string> = Readonly<object>,
  Body extends Readonly<object | string> | void | unknown =
    | Readonly<object | string>
    | undefined,
  Response = any,
> {
  readonly type: "read" | "mutate" | "delete";
  fetch(params: Params, body?: Body): Promise<Response>;
  getFetchKey(params: Params): string;
  readonly schema: S;
  readonly options?: FetchOptions;
}