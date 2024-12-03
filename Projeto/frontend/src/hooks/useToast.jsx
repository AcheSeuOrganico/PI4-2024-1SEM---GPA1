import { useContext } from "react";
import { ToasterContext } from "../contexts/ToasterContext";


export const useToast = () => {
    const { setToasterOptions } = useContext(ToasterContext);

    const toast = (message) => {
        setToasterOptions({
            isVisible: true,
            message: message
        });
    };

    return { toast };
};