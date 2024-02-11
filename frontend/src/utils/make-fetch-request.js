const makeFetchRequest = async(api) => {
  try {
    const data = await api();
    if (data.error) throw new Error(data.error);
    return await data;

  } catch (error) {
    console.log(error);
  }
};

export default makeFetchRequest;

