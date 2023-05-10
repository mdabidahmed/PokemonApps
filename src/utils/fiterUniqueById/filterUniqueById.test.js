const {filterUniqueById} = require('./filterUniqueById');

describe('filterUniqueById', () => {
  const arr = [
    {id: 1, name: 'Alice'},
    {id: 2, name: 'Bob'},
    {id: 3, name: 'Charlie'},
    {id: 2, name: 'David'},
    {id: 4, name: 'Eva'},
  ];

  test('should return unique objects based on the specified key', () => {
    const result = filterUniqueById(arr, 'id');

    expect(result).toEqual([
      {id: 1, name: 'Alice'},
      {id: 2, name: 'Bob'},
      {id: 3, name: 'Charlie'},
      {id: 4, name: 'Eva'},
    ]);
  });
});
