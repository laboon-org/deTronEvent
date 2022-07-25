import { createContext, useContext } from "react"
export type GlobalExit = {
  isExit: boolean
  setExit: React.Dispatch<React.SetStateAction<boolean>>
}

/* eslint-disable */
export const Exit = createContext<GlobalExit>({
  isExit: false, // set a default value
  setExit: () => {},
})
export const useGlobalExit = () => useContext(Exit)