import { useEffect } from 'react';
import useSWR from 'swr';

const adminAddresses = {
  '0x4dc3214f4486d547e38bc84d52d584536fa798ab51ef9888b0771ad8360d3b04': true,
};

export const handler = (web3, provider, contract) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 && contract ? 'web3/accounts' : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const owner = await contract.methods.getContractOwner().call();
      const isAdmin = account === owner;

      const isContractStopped = await contract.methods.getIsStopped().call();

      if (!account) {
        throw new Error(
          'Cannot retreive an account. Please refresh the browser.'
        );
      }

      return { account, isAdmin, isContractStopped };
    }
  );

  useEffect(() => {
    const mutator = (accounts) => mutate(accounts[0] ?? null);
    provider?.on('accountsChanged', mutator);

    return () => {
      provider?.removeListener('accountsChanged', mutator);
    };
  }, [provider]);

  return {
    data: data?.account,
    isAdmin: data?.isAdmin,
    isContractStopped: data?.isContractStopped,
    mutate,
    ...rest,
  };
};
