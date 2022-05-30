import { useCallback, useState } from 'react';

//CUSTOM COMPONENTS
import CommonInput from './CommonInput';
import AuthorList from './AuthorList';
import CategoriesSelector from './CategoriesSelector';
import PublichedPicker from './PublichedPicker';
import IsbnInput from './IsbnInput';
import ImageInput from './ImageInput';

//MUI COMPOENTS
import { Button, Container, Grow } from '@mui/material';

//VALIDATION FUNCTIONS ////////////////////////////////////
const titleValidations = (value) => {
  // Restrict all special chars except for [!@"#&*]
  const regex = /[`$%^()_+\-=[\]{};':\\|,.<>/?~]/;
  return (
    !regex.test(value.trim()) &&
    value.trim().length >= 10 &&
    value.trim().length <= 120
  );
};

const descValidations = (value) =>
  value.trim().length > 0 && value.trim().length <= 512;

const publisherValidations = (value) =>
  value.trim().length >= 5 && value.trim().length <= 60;

// We set extra validation over 20 pages
const pagesValidations = (value) => value >= 20 && value <= 9999;

// If input is empty
const authorValidation = (value) => value.length !== 0;

//VALIDATION FUNCTIONS END ////////////////////////////////

//////////////////////////////////////////////////////////
export default function Form() {
  const [title, setTitle] = useState({});
  const [subtitle, setSubtitle] = useState({});
  const [description, setDescription] = useState({});
  const [pages, setPages] = useState({});
  const [published, setPublished] = useState({});
  const [authors, setAuthors] = useState([]); // Array of objs
  const [categories, setCategories] = useState([]); // Array of objs
  const [isbns, setIsbns] = useState({});
  const [image, setImage] = useState({});

  const isValid =
    title.isValid &&
    subtitle.isValid &&
    description.isValid &&
    pages.isValid &&
    published.isValid &&
    authors.isValid &&
    categories.isValid &&
    isbns.isValid &&
    (image.isValid || Object.keys(image).length === 0); // true if image is not set

  // Print all data
  // console.log('isValid', isValid
  // console.log('title', title);
  // console.log('subtitle', subtitle);
  // console.log('description', description);
  // console.log('pages', pages);
  // console.log('published', published);
  // console.log('authors', authors);
  // console.log('categories', categories);
  // console.log('isbns', isbns);
  // console.log('image', image);

  //Submit form
  const submitHandler = (e) => {
    e.preventDefault();

    //SEND RESULTS TO SERVER /////
    /////////////////////////////

    //Print values
    const formObj = {
      title: {
        value: title.value,
        isValid: title.isValid,
      },
      subtitle: {
        value: subtitle.value,
        isValid: subtitle.isValid,
      },
      desc: {
        value: description.value,
        isValid: description.isValid,
      },
      pages: {
        value: pages.value,
        isValid: pages.isValid,
      },
      publisher: {
        value: published.publisher.value,
        isValid: published.publisher.isValid,
      },
      year: {
        value: published.year.value,
        isValid: published.year.isValid,
      },
      authors: {
        value: authors.value,
        isValid: authors.isValid,
      },
      categories: {
        value: categories.value,
        isValid: categories.isValid,
      },
      isbns: {
        value: isbns.value,
        isValid: isbns.isValid,
      },
      image: {
        value: image.value,
        isValid: image.isValid,
      },
    };
    console.log(formObj);

    //Reset values
    title.reset();
    subtitle.reset();
    description.reset();
    pages.reset();
    published.reset();
    authors.reset();
    categories.reset();
    isbns.reset();
    image.reset();
  };

  //////////////////////////////////
  return (
    <Container component='div'>
      <form noValidate autoComplete='off' onSubmit={submitHandler}>
        {/* TITLE */}
        <CommonInput
          name='title'
          isRequired
          validationFn={titleValidations}
          getValues={useCallback((value) => setTitle(value), [])}
        />
        {/* SUBTITLE */}
        <CommonInput
          name='subtitle'
          getValues={useCallback((value) => setSubtitle(value), [])}
        />
        {/* DESCRIPTION */}
        <CommonInput
          name='description'
          isRequired
          isMultiline
          firstUpper
          validationFn={descValidations}
          getValues={useCallback((value) => setDescription(value), [])}
        />
        {/* PAGES */}
        <CommonInput
          name='pages'
          type='number'
          isRequired
          validationFn={pagesValidations}
          getValues={useCallback((value) => setPages(value), [])}
        />
        {/* PUBLICHED DATE */}
        <PublichedPicker
          validationFn={publisherValidations}
          getValues={useCallback((value) => setPublished(value), [])}
        />
        {/* AUTHORS */}
        <AuthorList
          validateAuthor={authorValidation}
          getValues={useCallback((value) => setAuthors(value), [])}
        />
        {/* CATEGORIES */}
        <CategoriesSelector
          getValues={useCallback((value) => setCategories(value), [])}
        />
        {/* ISBN */}
        <IsbnInput getValues={useCallback((value) => setIsbns(value), [])} />
        {/* PHOTO */}
        <ImageInput getValues={useCallback((value) => setImage(value), [])} />
        {/* SUBMIT BTN */}
        <Grow in timeout={2000}>
          <Button
            disabled={!isValid}
            type='submit'
            variant='contained'
            size='large'
            color='primary'
            sx={{ mb: 2, mt: 1 }}
          >
            Submit
          </Button>
        </Grow>
      </form>
    </Container>
  );
}
