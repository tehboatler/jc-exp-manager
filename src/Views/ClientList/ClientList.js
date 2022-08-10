import { format, formatISO } from "date-fns"
import React, { useContext } from "react"
import uuid4 from "uuid4"
import ClientListItem from "../../Components/atoms/ClientListItem"
import { ClientListv3 } from "../../Context/ClientListv3"
import "./styles.css"

export default function ClientList() {
  const { clientList, setClientList } = useContext(ClientListv3)

  const addClientToList = () => {
    const newClientList = [
      ...clientList,
      {
        id: uuid4(),
        name: "no name",
        lowerBound: 10,
        upperBound: 15,
        arrivalTime: formatISO(new Date()),
      },
    ]
    setClientList(newClientList)
  }
  return (
    <div className="root">
      <div className="header">Queue</div>
      <div className="queue">
        {clientList.map((client, index) => {
          return (
            <ClientListItem
              key={index}
              index={index}
              client={client.name}
              LB={client.lowerBound}
              UB={client.upperBound}
            />
          )
        })}
      </div>
      <div className="addToQueue" onClick={() => addClientToList()}>
        Add Client
      </div>
    </div>
  )
}
