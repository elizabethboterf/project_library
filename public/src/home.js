function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const booksBorrowed = books.filter((book)=> !book.borrows[0].returned);
  return booksBorrowed.length;
}

function getMostCommonGenres(books) {
  let result =[];
  const genres = books.map((book) => book.genre);//map
  const genreCount = genres.reduce((acc, genre) => {//reduce, arrow function
    acc[genre]? acc[genre]++: acc[genre]=1;// ternary operator
    return acc;}
      , {});
  for(let genre in genreCount){// for/in loop
    const count = genreCount[genre];
    result.push({name: genre, count: count});//object shorthand
  }
  return topFive(result);
}

function getMostPopularBooks(books) {
  let popBooks =[];
  books.forEach((book) =>{
    const count = book.borrows.length;
    const title = book.title;
    popBooks.push({name: title, count: count});// object shorthand 
  });
  return topFive(popBooks);
}

function authorsRealName({name:{first, last}}){// deconstruction, additional function
  return(`${first} ${last}`);
}

function getMostPopularAuthors(books, authors) {
  let result =[];
  const booksByAuthor = books.map((book)=> {//map, arrow function
    return ({id : book.authorId, count : book.borrows.length });// object shorthand
  });
  const authorCount = booksByAuthor.reduce((acc, author)=> {//reduce
    acc[author.id]? acc[author.id]+= author.count: acc[author.id]= author.count;// ternanry operator
    return acc;
  }, {});
  for(let authorID in authorCount){//for/in loop
    const person = authors.find((author)=> author.id == authorID);
    const name = authorsRealName(person);
    const count = authorCount[authorID];
    result.push({name: name, count: count});//object shorthand
  }
  return topFive(result);
}

function topFive(list){//additional function
  let result = [];
  list.sort((itemA, itemB) => itemB.count - itemA.count);// arrow function
  list=list.slice(0,5);
  return list;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
