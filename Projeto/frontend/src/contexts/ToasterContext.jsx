import { createContext, useEffect, useState } from 'react'
import Toaster from '../components/Toast';

const ToasterContext = createContext();

const ToasterProvider = ({children}) => {
    const [options, setToasterOptions] = useState({
        isVisible: false,
        message: ''
    })

    const contextData = { options, setToasterOptions}

    return (
        <ToasterContext.Provider value={contextData}>
          {children}
          <Toaster
            message={options.message}
          />
        </ToasterContext.Provider>
      );
}

export { ToasterContext, ToasterProvider}