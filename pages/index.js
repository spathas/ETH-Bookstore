import { useState } from 'react';
import { CookiesProvider } from 'react-cookie';

//CUSTOM COMPONENTS
import SearchBar from '@components/ui/search/SearchBar';
import BookCardList from '@components/ui/book/BookCardList';
import { getAllBooks } from '@content/books/fetcher';

function SearchPage({ data }) {
  const [updatedBooks, setUpdatedBooks] = useState(data);

  const searchHandler = (books = data) => {
    setUpdatedBooks(books);
  };

  return (
    <CookiesProvider>
      <SearchBar data={data} onSearchChanged={searchHandler} />
      <BookCardList data={updatedBooks} />
    </CookiesProvider>
  );
}

export function getStaticProps() {
  const { data } = getAllBooks();
  return {
    props: {
      data,
    },
  };
}

export default SearchPage;
