import { useEffect, useState } from "react";
import { client } from "..";
import {
  Draft,
  GetDraftsDocument,
  GetDraftsQuery
} from "../apollo/generated/graphql";
import Layout from "../components/Layout";

const Dashboard = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await client.query<GetDraftsQuery>({
        query: GetDraftsDocument
      });

      setDrafts(data.drafts);
    })();
  }, []);

  return <Layout></Layout>;
};

export default Dashboard;
