import { Post } from '../types';

interface Action {
  type: 'SET_POSTS';
  payload: Post[];
}

interface PostState {
  posts: Post[];
}

const postReducer = (
  state: PostState,
  action: Action
): PostState => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;