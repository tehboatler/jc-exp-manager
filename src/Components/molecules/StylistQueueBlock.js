import React, { useContext } from "react"
import { ClientListv3 } from "../../Context/ClientListv3"
import StylistQueueItem from "../atoms/StylistQueueItem"

export default function StylistQueueBlock({ data }) {
  const {
    clientList,
    setClientList,
    setClientOptionsVisible,
    setCurrentClientIDToEdit,
  } = useContext(ClientListv3)

  const removeClientFromList = (index) => {
    const newClientList = [...clientList]
    newClientList.splice(index, 1)
    setClientList(newClientList)
  }

  const editClientOptions = (clientID) => {
    setClientOptionsVisible(true)
    setCurrentClientIDToEdit(clientID)
  }
  console.log("DATA: ", data)
  return (
    <div>
      {data.map((client, index) => (
        //   console.log("client: ", client),
        <div key={index} onClick={() => editClientOptions(client.id)}>
          <StylistQueueItem
            arrivalTime={client.arrivalTime}
            id={client.id}
            name={client.name}
            lb={client.lb}
            ub={client.ub}
            remLB={client.remainingLB}
            remUB={client.remainingUB}
            index={client.index}
          />
        </div>
      ))}
    </div>
  )
}
