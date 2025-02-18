import { createContext, useState } from "react";
import PropTypes from 'prop-types'; 

const MenuOpenContext = createContext();


const MenuOpenProvider = ({children}) => {
    const [toggler, setToggler] = useState(false)
    return (
        <MenuOpenContext.Provider value={{toggler, setToggler}}>
            {children}
        </MenuOpenContext.Provider>
    )
}
export default MenuOpenProvider;

MenuOpenProvider.propTypes = {
    children: PropTypes.node.isRequired
}