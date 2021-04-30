import { createContext, useEffect, useReducer, useState } from "react";
import { EFields, useSaveDraftMutation } from "../../apollo/generated/graphql";
import Draft from "../../db/drafts";
import Table from "../../db/tables";
import reducer, { initialState, IValues } from "./Reducer";

interface ICreateTableContext {
  values: IValues;
  setTitle: (title: string) => void;
  addField: (_id: string) => void;
  setFieldName: (_id: string, name: string) => void;
  setFieldType: (_id: string, type: EFields) => void;
  removeField: (_id: string) => void;
  setDeadline: (date?: string) => void;
  setTarget: (target?: number) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const CreateTableContext = createContext({} as ICreateTableContext);

const CreateTableProvider: React.FC = ({ children }) => {
  const [values, dispatch] = useReducer(reducer, initialState);
  const [draftKey, setDraftKey] = useState("");
  const [saveDraft] = useSaveDraftMutation();

  useEffect(() => {
    (async () => {
      const draft = new Draft();

      if (draftKey) {
        await draft.updateDraft(draftKey, values);
      } else if (window.history.state) {
        const { data } = await saveDraft({ variables: { values } });
        data && setDraftKey(data.saveDraft);
      }
    })();
  }, [values, draftKey, saveDraft]);

  const setTitle = (title: string) => {
    dispatch({
      type: "SET_TITLE",
      payload: title
    });
  };

  const addField = (_id: string) => {
    dispatch({
      type: "ADD_FIELD",
      payload: _id
    });
  };

  const removeField = (_id: string) => {
    dispatch({
      type: "REMOVE_FIELD",
      payload: _id
    });
  };

  const setFieldName = (_id: string, name: string) => {
    dispatch({
      type: "SET_FIELD_NAME",
      payload: {
        _id,
        name
      }
    });
  };

  const setFieldType = (_id: string, type: EFields) => {
    dispatch({
      type: "SET_FIELD_TYPE",
      payload: {
        _id,
        type
      }
    });
  };

  const setDeadline = (date?: string) => {
    dispatch({
      type: "SET_DEADLINE",
      payload: date
    });
  };

  const setTarget = (target?: number) => {
    dispatch({
      type: "SET_TARGET",
      payload: target
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      new Table().createTable(values);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <CreateTableContext.Provider
      value={{
        values,
        setTitle,
        addField,
        setFieldName,
        setFieldType,
        removeField,
        setDeadline,
        setTarget,
        handleSubmit
      }}
    >
      {children}
    </CreateTableContext.Provider>
  );
};

export default CreateTableProvider;
