import { InMemoryCache } from "@apollo/client";
import { TypedTypePolicies } from "./generated/graphql";

const typePolicies: TypedTypePolicies = {
  Draft: {
    keyFields: ["key"]
  }
};

const cache = new InMemoryCache({ typePolicies });

export default cache;
