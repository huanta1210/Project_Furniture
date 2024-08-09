export interface Province {
  full_name: string;
  full_name_en: string;
  id: string;
  latitude: string;
  longtitude: string;
  name: string;
  name_en: string;
}
export interface District {
  full_name: string;
  full_name_en: string;
  id: string;
  latitude: string;
  longtitude: string;
  name: string;
  name_en: string;
}
export interface Ward {
  full_name: string;
  full_name_en: string;
  id: string;
  latitude: string;
  longtitude: string;
  name: string;
  name_en: string;
}

export type State = {
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  selectedProvince: string | null;
  selectedDistrict: string | null;
};

export type Action =
  | { type: "SET_PROVINCES"; payload: Province[] }
  | { type: "SET_DISTRICTS"; payload: District[] }
  | { type: "SET_WARDS"; payload: Ward[] }
  | { type: "SET_SELECTED_PROVINCE"; payload: string | null }
  | { type: "SET_SELECTED_DISTRICT"; payload: string | null };
