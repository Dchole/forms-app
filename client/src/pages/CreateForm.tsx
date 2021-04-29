import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const CreateForm = () => {
  const { draftId } = useParams<{ draftId: string }>();

  console.log(draftId);

  return <Layout></Layout>;
};

export default CreateForm;
