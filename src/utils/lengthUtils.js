export function meters_to_feet_and_inches(num) {
  const length_in_meters = num / 10;
  var length_in_feet = length_in_meters / 0.3048;
  var feet = Math.floor(length_in_feet);
  var inches = Math.round((length_in_feet - feet) * 12);
  return `${feet}' ${inches}"`;
}
