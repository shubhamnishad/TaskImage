import {LOAD_IMAGE} from '../Redux/Actions';

const initialState = {
  imagePath: [],
};

export const loadImageReducer = (state = initialState, action) => {
  let images = state;

  switch (action.type) {
    case LOAD_IMAGE:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
