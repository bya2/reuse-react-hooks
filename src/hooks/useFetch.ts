import useError from "./useError";

const useFetch = (_url: URL, _init: RequestInit) => {
  const dispatchError = useError();

  return fetch(_url, _init)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      dispatchError(err);
    });
};

export default useFetch;
