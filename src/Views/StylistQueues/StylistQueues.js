import React, { useContext } from "react"
import { useEffect } from "react"
import StylistQueueItem from "../../Components/atoms/StylistQueueItem"
import StylistQueueBlock from "../../Components/molecules/StylistQueueBlock"
import { ClientListv3 } from "../../Context/ClientListv3"

export default function StylistQueues() {
  const [columns, setColumns] = React.useState([])
  const { clientList, stylists, setStylists } = useContext(ClientListv3)
  const styles = {
    root: {
      width: "100%",
      height: "100%",
      //   paddingLeft: "0.5vw",
      // backgroundColor: "red",
    },
    header: {
      display: "flex",
      width: "100%",
      height: "5vh",
      backgroundColor: "#0C0A1C",
      flexDirection: "row",
      boxShadow: "0px 0px 15px #000",
    },
    timeButton: {
      marginHorizontal: "1vw",
    },
    stylistHeader: {
      display: "flex",

      width: "20vw",
      height: "5vh",
      justifyContent: "space-around",
      alignItems: "center",
      fontSize: "0.9rem",
      color: "#D2CDFF",
      fontWeight: "bold",
      lineHeight: "5vh",
      boxShadow: "0px 0px 5px #000",
    },
    stylistQueue: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      width: `${20 * stylists.length}vw`,
      //   backgroundColor: "#0C0A1C",
      marginTop: "1vh",
      flexWrap: "wrap",
    },
    stylistQueueItem: {
      display: "flex",
      width: "20vw",
      height: "auto",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "0.9rem",
      fontWeight: "bold",
      lineHeight: "2.5vh",
      color: "white",
      //   border: "1px solid #352E6D",
      borderRadius: "2.5px",
      //   backgroundColor: "#15132C",
    },
  }

  const createStylistQueue = () => {
    let columns = []
    let stylistsByWaitTime = stylists.slice(0)
    // console.log("#########################")
    clientList.map((client, index) => {
      const lowLB = stylistsByWaitTime
        .slice(0)
        .sort((a, b) => a.totalWaitTimeLB - b.totalWaitTimeLB)[0]
      //   console.log("lowLB: ", lowLB)
      //   console.log("ClientLB: ", client.lowerBound)
      // update object lowerBoundTotals
      stylistsByWaitTime[
        stylistsByWaitTime.findIndex((a) => a.stylistName === lowLB.stylistName)
      ] = {
        index: lowLB.index,
        stylistName: lowLB.stylistName,
        totalWaitTimeLB: lowLB.totalWaitTimeLB + client.lowerBound,
        totalWaitTimeUB: lowLB.totalWaitTimeUB + client.upperBound,
      }

      let modifiedClient = {
        id: client.id,
        name: client.name,
        lb: client.lowerBound,
        ub: client.upperBound,
        arrivalTime: client.arrivalTime,
        remainingLB: lowLB.totalWaitTimeLB,
        remainingUB: lowLB.totalWaitTimeUB,
        index: index,
      }

      columns[lowLB.index] = columns[lowLB.index] || []
      columns[lowLB.index].push(modifiedClient)

      //   console.log("stylistsByWaitTime: ", stylistsByWaitTime)
    })
    console.log("columns: ", columns)
    setColumns(columns)
  }

  useEffect(() => {
    createStylistQueue()
  }, [clientList, stylists])

  const alterRemainingWaitTime = (stylist, valence) => {
    // find stylist by stylist
    const stylistIndex = stylists.findIndex((a) => a.stylistName === stylist)
    const newStylistState = stylists.slice(0)
    newStylistState[stylistIndex].totalWaitTimeLB += valence
    newStylistState[stylistIndex].totalWaitTimeUB += valence
    setStylists(newStylistState)
  }
  return (
    <div style={styles.root}>
      <div style={styles.header}>
        {stylists.map((stylist, index) => {
          return (
            <div style={styles.stylistHeader} key={index}>
              {stylist.stylistName}
            </div>
          )
        })}
      </div>
      <div style={styles.header}>
        {stylists.map((stylist, index) => {
          return (
            <div style={styles.stylistHeader} key={index}>
              <button
                style={styles.timeButton}
                onClick={() => alterRemainingWaitTime(stylist.stylistName, -1)}
              >
                -
              </button>
              {stylist.totalWaitTimeLB} - {stylist.totalWaitTimeUB}
              <button
                style={styles.timeButton}
                onClick={() => alterRemainingWaitTime(stylist.stylistName, 1)}
              >
                +
              </button>
            </div>
          )
        })}
      </div>
      <div style={styles.stylistQueue}>
        {columns.map((column, index) => {
          return (
            <div style={styles.stylistQueueItem} key={index}>
              <StylistQueueBlock data={column} />
            </div>
          )
        })}
        {/* {[...new Array(stylists.length * 2)].map((i, index) => {
          return (
            <div style={styles.stylistQueueItem} key={index}>
              next slots
            </div>
          )
        })} */}
      </div>
    </div>
  )
}
