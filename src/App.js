import React, { useState } from "react"
import "./App.css"
import { ClientListv3 } from "./Context/ClientListv3"
import { Routes, Route } from "react-router-dom"
import ClientList from "./Views/ClientList/ClientList"
import RootDashboard from "./Views/RootDashboard"
import StylistQueues from "./Views/StylistQueues/StylistQueues"
import ClientOptions from "./Views/ClientOptions/ClientOptions"

const stylistsv2 = [
  // {
  //   stylistName: "Stylist#1",
  //   totalWaitTimeLB: 0,
  //   totalWaitTimeUB: 0,
  //   index: 0,
  // },
  {
    stylistName: "ISA",
    totalWaitTimeLB: 0,
    totalWaitTimeUB: 0,
    index: 0,
  },
  {
    stylistName: "Penny",
    totalWaitTimeLB: 0,
    totalWaitTimeUB: 0,
    index: 1,
  },
  // {
  //   stylistName: "Neva",
  //   totalWaitTimeLB: 0,
  //   totalWaitTimeUB: 5,
  //   index: 2,
  // },
]

function App() {
  // const ClientListContext = React.useContext(ClientListv3)
  // console.log("ClientListContext: ", ClientListContext)
  const [clientList, setClientList] = useState([])
  const [stylists, setStylists] = useState(stylistsv2)
  const [clientOptionsVisible, setClientOptionsVisible] = useState(false)
  const [currentClientIDToEdit, setCurrentClientIDToEdit] = useState(null)
  const [stylistMenuToggle, setStylistMenuToggle] = useState(false)
  console.log("ClientList: ", clientList)
  return (
    <div className="App">
      <ClientListv3.Provider
        value={{
          clientList,
          setClientList,
          stylists,
          setStylists,
          clientOptionsVisible,
          setClientOptionsVisible,
          currentClientIDToEdit,
          setCurrentClientIDToEdit,
          stylistMenuToggle,
          setStylistMenuToggle,
        }}
      >
        <Routes>
          <Route path="/" element={<RootDashboard />} />
          <Route path="/jc-exp-manager" element={<RootDashboard />} />
          <Route path="ClientOptions" element={<ClientOptions />} />
        </Routes>
      </ClientListv3.Provider>
    </div>
  )
}

export default App
