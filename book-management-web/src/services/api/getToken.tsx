const getToken = (name: string) => {
  const token = localStorage.getItem(name);

  return token;
};

export default getToken;
