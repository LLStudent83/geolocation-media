import validationCoord from '../modules/validation/validationCoord';

// test('Health status check', () => {
//   // const result = getStatus({ name: 'Маг', health: 75 });
//   expect(result).toBe('healthy');
// });

test.each([
  ['есть скобки', '[55.55555, 55.55555]', true],
  ['есть пробел', '55.55555, 55.55555', true],
  ['нет пробела', '55.55555,55.55555', true],
  ['неправильное значение', '55.5555,55.55555', false],
])(
  ('Проверка валидности координат %s name условие %s amount'),
  (name, amount, expected) => {
    expect(Boolean(validationCoord(amount))).toBe(expected);
  },
);
