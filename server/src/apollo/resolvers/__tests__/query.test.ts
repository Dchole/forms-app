import server from "../../../index";
import supertest from "supertest";
import { startDatabase, stopDatabase } from "../../../lib/database";

beforeAll(async () => await startDatabase());
afterAll(async () => await stopDatabase());

const currentUserQuery = `
query CurrentUser {
    currentUser {
        _id
        email
        fullName
    }
}
`;

it("Get Current User", () => {});
