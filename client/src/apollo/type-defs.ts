import { gql } from "@apollo/client";

const typeDefs = gql`
  extend type Query {
    draft(key: String!): Draft!
    drafts(limit: Int, page: Int, filter: TableFilterInput): [Draft!]!
  }

  extend type Mutation {
    saveDraft(values: TableInput!): String!
    updateDraft(key: String!, values: TableInput!): String
    deleteDraft(key: String!): String
  }

  type Draft {
    key: String!
    data: DraftData!
  }

  type DraftData {
    title: String!
    target: Int
    deadline: String
    fields: [Field!]!
  }
`;

export default typeDefs;
