export const toggleName = (newName: string) => {
  return {
    type: 'Toggle',
    payload: newName,
  };
};
