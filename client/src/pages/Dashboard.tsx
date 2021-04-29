import {
  useGetDraftQuery,
  useGetDraftsQuery
} from "../apollo/generated/graphql";
import Layout from "../components/Layout";

const Dashboard = () => {
  const { data: draft } = useGetDraftQuery({
    variables: { key: "11eba915ba1afbb0a3082b233660f38c" }
  });

  const { data: drafts } = useGetDraftsQuery();

  console.log({ draft, drafts });

  return <Layout></Layout>;
};

export default Dashboard;
