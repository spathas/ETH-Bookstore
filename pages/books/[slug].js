//CUSTOM COMPONENTS
import BookPreview from '@components/ui/book/BookPreview';
import SuggestedBooks from '@components/ui/book/SuggestedBooks';
import { getAllBooks } from '@content/books/fetcher';
import slugify from 'slugify';

//STYLES
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function BookPage({ data, book }) {
  //Styles
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <BookPreview book={book} data={data} />
      {matchesSM && <SuggestedBooks book={book} booksArr={data} />}
    </>
  );
}

export function getStaticPaths() {
  const { data } = getAllBooks();

  return {
    paths: data.map((c) => ({
      params: {
        slug: slugify(c.title),
      },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllBooks();
  const book = data.filter((c) => slugify(c.title) === params.slug)[0];

  return {
    props: {
      data,
      book,
    },
  };
}

export default BookPage;
