// Convert "ENUM_TEXT" into "Enum Text"
const convertToReadable = (text: string) =>
  text
    .split("_")
    .map(word => word.charAt(0) + word.substring(1).toLowerCase()) // capitalized words from uppercase
    .join(text === "TIME_DATE" ? " & " : " ");

export default convertToReadable;
