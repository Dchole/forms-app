import { useGetDraftsQuery } from "../apollo/generated/graphql";
import Layout from "../components/Layout";

const Dashboard = () => {
  const { data } = useGetDraftsQuery();

  console.log({ data });

  return <Layout></Layout>;
};

export default Dashboard;
