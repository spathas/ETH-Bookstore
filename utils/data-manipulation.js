exports.removeDuplicates = (booksArr) => {
  const books = [].concat.apply([], booksArr);
  const newArray = [];
  const uniqueObject = {};

  // Loop for the array elements
  for (const i in books) {
    // Extract the title
    const objTitle = books[i]['title'];

    // Use the title as the index
    uniqueObject[objTitle] = books[i];
  }

  // Loop to push unique object into array
  for (const i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }

  return newArray;
};
