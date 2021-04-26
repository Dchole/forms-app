const getIdFromFieldId = (name: string): string => name.split("-").pop() || "";

export default getIdFromFieldId;
