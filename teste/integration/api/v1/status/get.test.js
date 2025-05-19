test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBory = await response.json();

  const parsedUpdateAt = new Date(responseBory.updated_at).toISOString();
  expect(responseBory.updated_at).toEqual(parsedUpdateAt);

  expect(responseBory.dependencies.database.version).toEqual("16.0");
  expect(responseBory.dependencies.database.max_connections).toEqual(100);
  expect(responseBory.dependencies.database.opened_connections).toEqual(1);
});
