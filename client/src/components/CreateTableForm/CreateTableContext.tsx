import { createContext, useEffect, useReducer, useState } from "react";
import Draft from "../../db/drafts";
import Table from "../../db/tables";
import reducer, { initialState, IValues } from "./Reducer";

interface ICreateTableContext {
  values: IValues;
  setTitle: (title: string) => void;
  addField: (id: string) => void;
  setFieldName: (id: string, name: string) => void;
  setFieldType: (id: string, type: string) => void;
  removeField: (id: string) => void;
  setDeadline: (date?: string) => void;
  setTarget: (target?: number) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const CreateTableContext = createContext({} as ICreateTableContext);

const CreateTableProvider: React.FC = ({ children }) => {
  const [values, dispatch] = useReducer(reducer, initialState);
  const [draftKey, setDraftKey] = useState("");

  useEffect(() => {
    (async () => {
      const draft = new Draft();

      if (draftKey) {
        await draft.updateDraft(draftKey, values);
      } else {
        const key = await draft.saveDraft(values);
        setDraftKey(key);
      }
    })();
  }, [values, draftKey]);

  const setTitle = (title: string) => {
    dispatch({
      type: "SET_TITLE",
      payload: title
    });
  };

  const addField = (id: string) => {
    dispatch({
      type: "ADD_FIELD",
      payload: id
    });
  };

  const removeField = (id: string) => {
    dispatch({
      type: "REMOVE_FIELD",
      payload: id
    });
  };

  const setFieldName = (id: string, name: string) => {
    dispatch({
      type: "SET_FIELD_NAME",
      payload: {
        id,
        name
      }
    });
  };

  const setFieldType = (id: string, type: string) => {
    dispatch({
      type: "SET_FIELD_TYPE",
      payload: {
        id,
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
