import {
  createContext,
  useState,
  useContext,
  ReactChildren,
  ReactChild,
} from "react";

type ContextType = {};

const AppContext = createContext<ContextType | null>(null);

type Props = {
  children: ReactChild | ReactChildren;
};

export default function AppContextProvider({ children }: Props) {
  const [pricingRule, setPricingRule] = useState("lindsay2018");
  const [freeDisposal, setFreeDisposal] = useState(true);
  const [bidders, setBidders] = useState<any[]>([]);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext) as ContextType;
}
