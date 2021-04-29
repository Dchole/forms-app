import { TypedTypePolicies } from "./generated/graphql";
import Draft from "../db/drafts";

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      draft: {
        read(_, { variables }) {
          return new Draft().getDraft(variables?.key);
        }
      },
      drafts: {
        async read() {
          const drafts = new Draft();
          return drafts
            .getDrafts()
            .then(data => ({ node: data, hasMore: false }));
        }
      }
    }
  }
};

export default typePolicies;
