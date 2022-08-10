import React, { useContext } from "react"
import uuid4 from "uuid4"
import { ClientListv3 } from "../../Context/ClientListv3"

const styles = {
  root: {
    paddingTop: "1.5%",
    // backgroundColor: "red",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    color: "white",
    border: "1px solid #352E6D",
    borderRadius: "2.5px",
    padding: "1%",
    marginLeft: "2.5%",
    height: "5vh",
    width: "92.5%",
    fontSize: "0.95rem",
    backgroundColor: "#15132C",
  },
  listItemNumber: {
    paddingRight: "1%",
    width: "15%",
    fontSize: "1rem",
  },
  timeEst: {
    // backgroundColor: "#fff",
    fontSize: "0.75rem",
    color: "white",
    fontWeight: "bold",
  },
}

export default function ClientListItem({ client, index, LB, UB }) {
  return (
    <div style={styles.root}>
      <div style={styles.listItem}>
        <div style={styles.listItemNumber}>{index}</div>
        <div>{client}</div>
        <div style={styles.timeEst}>
          {LB} - {UB}
        </div>
      </div>
    </div>
  )
}
