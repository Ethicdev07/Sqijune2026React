//useContext is a react hook that allows components to access shared data without passing props manually through every level of the component tree(to avoid a problem called prop drilling)

import {createContext} from "react";

const UserContext = createContext();

export default UserContext;