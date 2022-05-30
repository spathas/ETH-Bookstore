export const COURSE_STATES = {
  0: 'purchased',
  1: 'activated',
  2: 'deactivated',
};

export const normalizeOwnedBook = (web3) => (book, ownedBook) => {
  return {
    ...book,
    ownedBook: ownedBook.id,
    proof: ownedBook.proof,
    owner: ownedBook.owner,
    price: web3.utils.fromWei(ownedBook.price),
    state: COURSE_STATES[ownedBook.state],
  };
};
