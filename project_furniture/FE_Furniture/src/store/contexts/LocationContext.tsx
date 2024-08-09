import { createContext, useEffect, useReducer } from "react";
import { Action, State } from "../../interfaces/location";
import { ChildrenProps } from "../../interfaces/Children";
import locationReducer from "../reducers/locationReducer";
import { toast } from "react-toastify";
import instanceProvinces from "../../api/provinces";

type LocationContext = {
  locationState: State;
  dispatch: React.Dispatch<Action>;
  fetchDistrict: (selectedProvince: string) => void;
  fetchWard: (selectedDistrict: string) => void;
};

export const LocationContext = createContext<LocationContext>(
  {} as LocationContext
);

export const LocationProvider = ({ children }: ChildrenProps) => {
  const [locationState, dispatch] = useReducer(locationReducer, {
    provinces: [],
    districts: [],
    wards: [],
    selectedProvince: null,
    selectedDistrict: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await instanceProvinces.get("/1/0.htm");

        if (!res) {
          toast.error("Provinces not found");
        } else {
          dispatch({ type: "SET_PROVINCES", payload: res.data.data });
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching");
      }
    })();
  }, []);

  const fetchDistrict = async (selectedProvince: string) => {
    try {
      const res = await instanceProvinces.get(`/2/${selectedProvince}.htm`);
      if (!res) {
        toast.error("District not found");
      } else {
        dispatch({ type: "SET_DISTRICTS", payload: res.data.data });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetchingDistrict");
    }
  };

  const fetchWard = async (selectedDistrict: string) => {
    try {
      const res = await instanceProvinces.get(`/3/${selectedDistrict}.htm`);
      if (!res) {
        toast.error("District not found");
      } else {
        dispatch({ type: "SET_WARDS", payload: res.data.data });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching award");
    }
  };

  return (
    <LocationContext.Provider
      value={{ locationState, dispatch, fetchDistrict, fetchWard }}
    >
      {children}
    </LocationContext.Provider>
  );
};
