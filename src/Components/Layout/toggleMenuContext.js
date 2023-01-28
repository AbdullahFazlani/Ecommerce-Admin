import React from "react";

const ToggleMenuContext = React.createContext();

const ToggleMenuContextProvider = ToggleMenuContext.Provider;
const ToggleMenuContextConsumer = ToggleMenuContext.Consumer;

export { ToggleMenuContextProvider, ToggleMenuContextConsumer };
