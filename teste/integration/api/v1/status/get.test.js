import orchestrator from "teste/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});
describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving curret system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBory = await response.json();

      const parsedUpdateAt = new Date(responseBory.updated_at).toISOString();
      expect(responseBory.updated_at).toEqual(parsedUpdateAt);

      expect(responseBory.dependencies.database.version).toEqual("16.0");
      expect(responseBory.dependencies.database.max_connections).toEqual(100);
      expect(responseBory.dependencies.database.opened_connections).toEqual(1);
    });
  });
});
