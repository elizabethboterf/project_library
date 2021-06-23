function findAccountById(accounts, id) {
  return accounts.find((account)=> account.id == id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accA, accB)=> accA.name.last.toLowerCase()< accB.name.last.toLowerCase() ? -1: 1);
}
function getAllBorrows(books){
  let result = [];
  let bookBorrows = books.map((book)=> book.borrows);//map, arrow function
  bookBorrows.forEach((book)=>{//arrow function
    book.forEach((item)=> result.push(item));//arrow function
  } );
  return result;
}

function getTotalNumberOfBorrows(account, books) {
  const id = account.id;
  const bookBorrows = getAllBorrows(books);
  const num = bookBorrows.reduce((acc, current)=>{//reduce, arrow function
    let currID = current.id
    if(acc[currID]){
      acc[currID]+=1;
    }
    else{
      acc[currID]=1;
    }
    return acc;
  },{});

  return num[id];
}

function getBooksPossessedByAccount(account, books, authors) {
  const booksFunc = require("./books");
  const findAuthor = booksFunc.findAuthorById;
  
  const booksHeld = books.filter((book)=> {// filter, arrow function
    const bookInfo = book.borrows;
    if(bookInfo[0].id==account.id && !bookInfo[0].returned){
      return book;
    }
  });
  console.log(booksHeld);
  const result = booksHeld.map((book)=>{//map, arrow function
    const {id, title, genre, authorId, borrows}= book;
    const first ={id, title, genre, authorId};//object shortand
    const author = findAuthor(authors, authorId);
    return({...first, author : author, borrows});//spread operator, object shorthand
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
