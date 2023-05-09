export function filterUniqueById(arr, key) {
  return Object.values(
    arr.reduce((acc, cur) => {
      if (!acc[cur[key]]) {
        acc[cur[key]] = cur;
      }
      return acc;
    }, {}),
  );
}
