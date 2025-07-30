"use client"
import React from "react";

type ContextType = {
    currentStep: number,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const authContext = React.createContext<ContextType | null>(null);

type ProviderProps = {
    children: React.ReactNode
}

export const AuthContextProvider = (props: ProviderProps) => {

    const [currentStep, setCurrentStep] = React.useState(1);

    return <authContext.Provider value={{currentStep, setCurrentStep}}>
        {props.children}
    </authContext.Provider>

}

export const useAuthContextHook = () => {
    const context = React.useContext(authContext);
    if(!context) throw new Error("use the context within  the provider");

    return context
}