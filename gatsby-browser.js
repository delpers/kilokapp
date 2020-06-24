import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"
import React from "react"

import { UserProvider } from "./src/components/UserContext"

export const wrapRootElement = ({ element }) => (
  <UserProvider>{element}</UserProvider>
)
