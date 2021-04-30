import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "..";
import {
  Draft as TDraft,
  GetDraftQuery,
  GetDraftsDocument as query,
  GetDraftQueryVariables,
  GetDraftsQuery,
  useGetDraftQuery
} from "../apollo/generated/graphql";
import Layout from "../components/Layout";
import Draft from "../db/drafts";

const CreateForm = () => {
  const { draftId } = useParams<{ draftId: string }>();
  const { data } = useGetDraftQuery({ variables: { key: draftId } });

  console.log(data);

  const [draft, setDraft] = useState<TDraft | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await client.query<
        GetDraftsQuery,
        GetDraftQueryVariables
      >({
        query,
        variables: { key: draftId }
      });

      console.log(data.drafts[0]);
      setDraft(data.drafts[0]);
    })();
  }, [draftId]);

  return <Layout></Layout>;
};

export default CreateForm;
