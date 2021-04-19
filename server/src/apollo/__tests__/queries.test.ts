import gql from "graphql-tag";
import { createTestClient } from "apollo-server-testing";
import { mockServer } from "@graphql-tools/mock";
import { schema } from "../..";

const GET_USER = gql``;

describe("Query Current User", () => {
  const server = mockServer(schema, {});

  // @ts-ignore
  const { query } = createTestClient(server);

  query({ query: GET_USER });
});
