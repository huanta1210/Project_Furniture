import { createContext, useContext, useState } from "react";
import { ChildrenProps } from "../../interfaces/Children";

interface PageContext {
  title: string;
  breadcrumbs: string;
  setTitle: (title: string) => void;
  setBreadcrumbs: (breadcrumbs: string) => void;
}

export const PageContext = createContext<PageContext | undefined>(undefined);

export const PageProvider = ({ children }: ChildrenProps) => {
  const [title, setTitle] = useState<string>("Main Dashboard");
  const [breadcrumbs, setBreadcrumbs] = useState<string>(
    "Pages / Main Dashboard"
  );

  return (
    <PageContext.Provider
      value={{ title, breadcrumbs, setTitle, setBreadcrumbs }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePageContext is undefined");
  }
  return context;
};
