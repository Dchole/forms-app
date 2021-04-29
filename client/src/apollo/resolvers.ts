import { Resolvers } from "@apollo/client";
import Draft from "../db/drafts";
import { GetDraftDocument, GetDraftsDocument } from "./generated/graphql";

const resolvers: Resolvers = {
  Query: {
    async draft(_, { key }) {
      return new Draft().getDraft(key);
    },
    async drafts() {
      return new Draft().getDrafts();
    }
  },
  Mutation: {
    async saveDraft(_, { values }, { cache }) {
      const data = cache.readQuery({ query: GetDraftsDocument });

      const key = await new Draft().saveDraft(values);

      data &&
        cache.writeQuery({
          query: GetDraftsDocument,
          data: { drafts: [...data.drafts, values] }
        });

      return key;
    },
    async updateDraft(_, { key, values }, { cache }) {
      const { draft } = cache.readQuery({
        query: GetDraftDocument,
        variables: { key }
      });

      console.log(draft);
      await new Draft().updateDraft(key, values);
    },
    async deleteDraft(_, { key }, { cache }) {
      const { drafts } = cache.readQuery({
        query: GetDraftsDocument
      });

      console.log(drafts);
      new Draft().deleteDraft(key);
    }
  }
};

export default resolvers;
