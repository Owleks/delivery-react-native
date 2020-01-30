import React, {createContext, useState, useCallback} from 'react';
import AppNavigator from "./navigation/AppNavigation";

export const SelectedContext = createContext({
  selected:{},
  totalPrice: 0
});

// Signed-in user context

export default function App() {
  const [selected, changeSelected] = useState({});
  const [totalPrice, changeTotalPrice] = useState(0);
  const onChange = useCallback(({selected, totalPrice}) =>  {
    changeSelected(selected);
    changeTotalPrice(totalPrice);
  },[changeSelected, changeTotalPrice]);
  const context = {
    selected,
    totalPrice,
    onChange
  }
  return (
    <SelectedContext.Provider value={context}>
      <AppNavigator />
    </SelectedContext.Provider>
  );
}

