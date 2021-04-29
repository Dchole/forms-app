import { customAlphabet } from "nanoid";
import { lowercase } from "nanoid-dictionary";

const generateId = customAlphabet(lowercase, 10);

export default generateId;
