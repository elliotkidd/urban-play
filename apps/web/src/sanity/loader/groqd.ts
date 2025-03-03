import { BaseQuery, InferType, z } from "groqd";
import {
  ClientPerspective,
  ContentSourceMap,
  FilteredResponseQueryOptions,
  UnfilteredResponseQueryOptions,
} from "next-sanity";
import { QueryParams, SanityClient } from "sanity";

type BaseType<T = any> = z.ZodType<T>;
export type GroqdQuery = BaseQuery<BaseType<any>>;

export type Sanity = {
  client: SanityClient;
  query<T extends GroqdQuery>(options: {
    groqdQuery: T;
    params?: QueryParams;
    queryOptions?:
      | FilteredResponseQueryOptions
      | UnfilteredResponseQueryOptions;
  }): Promise<{
    data: InferType<T>;
    perspective?: ClientPerspective;
    sourceMap?: ContentSourceMap;
  }>;
};
