import { customAlphabet } from "nanoid";
import { lowercase } from "nanoid-dictionary";
import fieldTypes from "../CreateTableForm/fieldTypes";

interface IField {
  id: string;
  name: string;
  type: string;
}

export interface IValues {
  title: string;
  limit?: number;
  deadline?: string;
  fields: IField[];
}

const nanoid = customAlphabet(lowercase, 10);

const defaultField = {
  name: "",
  type: fieldTypes.Text[0].text
};

export const initialState: IValues = {
  title: "Untitled Table",
  limit: undefined,
  deadline: undefined,
  fields: [{ id: nanoid(), ...defaultField }]
};

export type TAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DEADLINE"; payload?: string }
  | { type: "SET_TARGET"; payload?: number }
  | { type: "ADD_FIELD"; payload: string }
  | { type: "SET_FIELD_NAME"; payload: { id: string; name: string } }
  | { type: "SET_FIELD_TYPE"; payload: { id: string; type: string } }
  | { type: "REMOVE_FIELD"; payload: string };

const reducer = (state = initialState, { type, payload }: TAction) => {
  switch (type) {
    case "SET_TITLE":
      const title = payload as string;

      return { ...state, title };

    case "SET_DEADLINE":
      const deadline = payload as string;

      return { ...state, deadline };

    case "SET_TARGET":
      const limit = payload as number;

      return { ...state, limit };

    case "ADD_FIELD":
      const copyFields = [...state.fields];

      const activeField = copyFields.find(
        field => field.id === payload
      ) as IField;

      const position = copyFields.indexOf(activeField);

      copyFields.splice(position, 1, activeField, {
        id: nanoid(),
        ...defaultField
      });

      return { ...state, fields: copyFields };

    case "SET_FIELD_NAME":
      const setFields = state.fields.map(field => {
        const fieldToUpdate = payload as { id: string; name: string };

        return field.id === fieldToUpdate.id
          ? { ...field, name: fieldToUpdate.name }
          : field;
      });

      return { ...state, fields: setFields };

    case "SET_FIELD_TYPE":
      const setTypes = state.fields.map(field => {
        const fieldToUpdate = payload as { id: string; type: string };

        return field.id === fieldToUpdate.id
          ? { ...field, type: fieldToUpdate.type }
          : field;
      });

      return { ...state, fields: setTypes };

    case "REMOVE_FIELD":
      const remainingFields = state.fields.filter(({ id }) => id !== payload);

      return { ...state, fields: remainingFields };

    default:
      return state;
  }
};

export default reducer;
