import { createContext, useContext } from "react"

export interface UserInfo {
  id: number,
  name: string,
  image: string,
}
export type CurrentUser = {
  user: UserInfo | undefined,
  setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>
}


export const UserContext = createContext<CurrentUser>({
  user: undefined, // set a default value
  setUser: () => {return},
})

export const useCurrentUser = () => useContext(UserContext)