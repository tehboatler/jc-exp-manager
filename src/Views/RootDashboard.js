import React, { useContext } from "react"
import { ClientListv3 } from "../Context/ClientListv3"
import ClientList from "./ClientList/ClientList"
import ClientOptions from "./ClientOptions/ClientOptions"
import StylistQueues from "./StylistQueues/StylistQueues"

export default function RootDashboard() {
  const { setClientOptionsVisible } = useContext(ClientListv3)
  return (
    <>
      <ClientOptions />
      <ClientList />
      <StylistQueues />
    </>
  )
}
