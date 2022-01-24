import validationCoord from '../modules/validation/validationCoord';

test('Health status check', () => {
  // const result = getStatus({ name: 'Маг', health: 75 });
  expect(result).toBe('healthy');
});
