const initialStateCreator = () => {
  return {
      user: {},
      company: {}
  };
};

const initialState = initialStateCreator();

export const login = (state = initialState, action) => {
    return state;
};
