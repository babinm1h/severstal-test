export const removeFalsyValues = (obj: Record<PropertyKey, string>) => {
  const formattedObj: Record<string, string> = {};

  for (const key in obj) {
    if (obj[key]) {
      formattedObj[key] = obj[key];
    }
  }

  return formattedObj;
};
