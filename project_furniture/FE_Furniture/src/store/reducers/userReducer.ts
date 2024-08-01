import { State, Action } from "../../interfaces/User";

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_USER": {
      return {
        ...state,
        users: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
