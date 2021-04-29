import { Resolvers } from "@apollo/client";
import Draft from "../db/drafts";
import {
  Draft as TDraft,
  DraftData,
  GetDraftDocument,
  GetDraftsDocument,
  SaveDraftDocument
} from "./generated/graphql";

const resolvers: Resolvers = {
  Query: {
    async draft(_, { key }) {
      const data: DraftData = await new Draft().getDraft(key);
      data.__typename = "DraftData";
      data.fields.map(field => (field.__typename = "Field"));

      const draft = { key, data, __typename: "Draft" };

      return draft;
    },
    async drafts() {
      const drafts: TDraft[] = await new Draft().getDrafts();

      return drafts.map(draft => {
        draft.__typename = "Draft";
        draft.data.__typename = "DraftData";
        draft.data.fields.map(field => (field.__typename = "Field"));

        return draft;
      });
    }
  },
  Mutation: {
    async saveDraft(_, { values }, { cache }) {
      const data = cache.readQuery({ query: GetDraftsDocument });

      const key = await new Draft().saveDraft(values);
      const newDraft = { ...values, key, __typename: "Draft" };

      data &&
        cache.writeQuery({
          data: { query: SaveDraftDocument, drafts: [...data.drafts, newDraft] }
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
