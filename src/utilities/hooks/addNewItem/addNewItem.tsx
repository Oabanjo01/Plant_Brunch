const UseAddNewItem = () => {
  const addItem = (uri: string) => {
    const blobToBase64 = blob => {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(blob);
      });
    };
    const convertURIToBase64 = async (uri: any) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      return await blobToBase64(blob);
    };
  };
};
