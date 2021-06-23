function findAuthorById(authors, id) {
  return authors.find((author)=> author.id == id);//find, arrow function
}

function findBookById(books, id) {
  return books.find((book)=> book.id == id);// find, arrow function
}

function partitionBooksByBorrowedStatus(books) {
  let booksIn = books.filter((book)=> book.borrows[0].returned);//filter, arrow function
  let booksOut = books.filter((book)=> !book.borrows[0].returned);//filter, arrow function
  return [booksOut, booksIn];//
}

function getBorrowersForBook({borrows}, accounts) {//deconstruction
  const accountFunc = require("./accounts");
  const findAccount = accountFunc.findAccountById;
  let result = borrows.map((log)=> {//map, arrow function
      const account = findAccount(accounts, log.id);
      let {picture, age, name, company, email, registered}= account;
      return {...log, picture, age, name, company, email, registered};//spread operator
  });
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
