export interface Categories {
  _id: string | number;
  categoryName: string;
  slug: string;
}

export type State = {
  categories: Categories[];
};

export type Action =
  | { type: "SET_CATEGORIES"; payload: Categories[] }
  | { type: "CREATE_CATEGORIES"; payload: Categories }
  | { type: "UPDATE_CATEGORIES"; payload: Categories }
  | { type: "DELETE_CATEGORIES"; payload: string | number };
