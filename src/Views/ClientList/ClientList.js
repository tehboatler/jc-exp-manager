import { format, formatISO } from "date-fns"
import React, { useContext } from "react"
import uuid4 from "uuid4"
import ClientListItem from "../../Components/atoms/ClientListItem"
import { ClientListv3 } from "../../Context/ClientListv3"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import "./styles.css"

export default function ClientList() {
  const { clientList, setClientList } = useContext(ClientListv3)

  const addClientToList = () => {
    const newClientList = [
      ...clientList,
      {
        id: uuid4(),
        name: "newClient",
        lowerBound: 10,
        upperBound: 15,
        arrivalTime: format(new Date(), "HH:mm"),
        promisedLB: 10,
        promisedUB: 15,
      },
    ]
    setClientList(newClientList)
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return
    const items = Array.from(clientList)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setClientList(items)
  }
  return (
    <div className="root">
      <div className="header">Queue</div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="queue">
          {(provided) => (
            <div
              className="queue"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {clientList.map((client, index) => {
                return (
                  <Draggable
                    key={client.id}
                    draggableId={client.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <ClientListItem
                          index={index}
                          client={client.name}
                          LB={client.lowerBound}
                          UB={client.upperBound}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="addToQueue" onClick={() => addClientToList()}>
        Add Client
      </div>
    </div>
  )
}
