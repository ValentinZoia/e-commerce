export function expectValidationError(response: any, expectedFields: string[]) {
  expect(response.status).toBe(400);
  expect(response.body.type).toBe("ValidationError");
  expect(response.body.statusCode).toBe(400);
  expect(response.body.message).toBe("Validation failed");

  // Verificar que todos los campos esperados están en los errores
  expectedFields.forEach((field) => {
    expect(response.body.errors).toHaveProperty(field);
  });

  // Verificar que no hay errores inesperados
  const receivedFields = Object.keys(response.body.errors);
  expect(receivedFields.sort()).toEqual(expectedFields.sort());
}
