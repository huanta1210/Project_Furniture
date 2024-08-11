import { Action, State } from "../../interfaces/Location";

const locationReducer = (locationState: State, action: Action) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return { ...locationState, address: action.payload };
    case "SET_PROVINCES":
      return { ...locationState, provinces: action.payload };
    case "SET_DISTRICTS":
      return { ...locationState, districts: action.payload };
    case "SET_WARDS":
      return { ...locationState, wards: action.payload };
    case "SET_SELECTED_PROVINCE":
      return {
        ...locationState,
        selectedProvince: action.payload,
        selectedDistrict: null,
        districts: [],
        wards: [],
      };
    case "SET_SELECTED_DISTRICT":
      return { ...locationState, selectedDistrict: action.payload, wards: [] };
    default:
      return locationState;
  }
};

export default locationReducer;
