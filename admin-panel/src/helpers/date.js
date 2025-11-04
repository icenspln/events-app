// takes in a javascript date object and returns yyyy-mm-dd format
// to populate DOM input type date element
export function stringToDOM(str) {
  const date = new Date(str);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
