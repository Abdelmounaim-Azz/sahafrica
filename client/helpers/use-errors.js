export function reformattedErr(err, label) {
  let formattedErr = err.map((obj) => {
    let rObj = {};
    rObj[obj.field] = obj.message;
    return rObj;
  });
  const errorObj = formattedErr.find((element) => {
    return element[label];
  });
  return errorObj;
}
