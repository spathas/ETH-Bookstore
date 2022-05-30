import { normalizeOwnedBook } from '@utils/normalize';
import useSWR from 'swr';

export const handler = (web3, contract) => (account) => {
  const swrRes = useSWR(
    () =>
      web3 && contract && account && account.isAdmin
        ? `web3/managedBooks/${account.data}`
        : null,
    async () => {
      const books = [];
      const bookCount = await contract.methods.getBookCount().call();

      for (let i = Number(bookCount) - 1; i >= 0; i--) {
        const bookHash = await contract.methods.getBookHashAtIndex(i).call();
        const book = await contract.methods.getBookByHash(bookHash).call();

        if (book) {
          const normalized = normalizeOwnedBook(web3)({ hash: bookHash }, book);
          books.push(normalized);
        }
      }

      return books;
    }
  );

  return swrRes;
};
