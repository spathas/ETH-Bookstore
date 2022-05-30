import { createBookHash } from '@utils/hash';
import { normalizeOwnedBook } from '@utils/normalize';
import useSWR from 'swr';

export const handler = (web3, contract) => (books, account) => {
  const swrRes = useSWR(
    () => (web3 && contract && account ? `web3/ownedBooks/${account}` : null),
    async () => {
      const ownedBooks = [];

      for (let i = 0; i < books.length; i++) {
        const book = books[i];

        if (!book.id) {
          continue;
        }

        const bookHash = createBookHash(web3)(book.id, account);
        const ownedBook = await contract.methods.getBookByHash(bookHash).call();

        if (ownedBook.owner !== '0x0000000000000000000000000000000000000000') {
          const normalized = normalizeOwnedBook(web3)(book, ownedBook);
          ownedBooks.push(normalized);
        }
      }

      return ownedBooks;
    }
  );

  return {
    ...swrRes,
    lookup:
      swrRes.data?.reduce((a, c) => {
        a[c.id] = c;
        return a;
      }, {}) ?? {},
  };
};
