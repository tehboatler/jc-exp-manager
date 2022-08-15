import React, { useContext } from "react"
import { useEffect } from "react"
import StylistQueueItem from "../../Components/atoms/StylistQueueItem"
import StylistQueueBlock from "../../Components/molecules/StylistQueueBlock"
import { ClientListv3 } from "../../Context/ClientListv3"
import "./styles.css"

export default function StylistQueues() {
  const [columns, setColumns] = React.useState([])
  const { clientList, stylists, setStylists, setStylistMenuToggle } =
    useContext(ClientListv3)
  const styles = {
    root: {
      width: "100%",
      height: "100vh",
      //   paddingLeft: "0.5vw",
      // backgroundColor: "red",
      // overflowY: "scroll",
    },
    header: {
      display: "flex",
      width: "100%",
      height: "5vh",
      backgroundColor: "#0C0A1C",
      flexDirection: "row",
      boxShadow: "0px 0px 15px #000",
      userSelect: "none",
    },
    timeButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "2vw",
      aspectRatio: "1/1",
      marginHorizontal: "1vw",
      backgroundColor: "#15132C",
      borderRadius: "0.5vw",
      borderStyle: "solid",
      borderColor: "#352E6D",
      color: "#D2CDFF",
      userSelect: "none",
    },
    stylistHeader: {
      display: "flex",
      userSelect: "none",

      width: "20vw",
      height: "5vh",
      justifyContent: "space-around",
      alignItems: "center",
      fontSize: "2.5vh",
      color: "#D2CDFF",
      fontWeight: "bold",
      lineHeight: "2.5vh",
      boxShadow: "0px 0px 5px #000",
      userSelect: "none",
    },
    stylistQueue: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      height: "auto",
      width: `${20 * stylists.length}vw`,
      //   backgroundColor: "#0C0A1C",
      marginTop: "1vh",
      flexWrap: "wrap",
      userSelect: "none",
      paddingBottom: "5vh",
      // overflowY: "scroll",
      // backgroundColor: "red",
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
        promisedUB: client.promisedUB,
        promisedLB: client.promisedLB,
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
    <div className="stylistQueueWrapper">
      <div style={styles.header}>
        {stylists.map((stylist, index) => {
          return (
            <div style={styles.stylistHeader} key={index} onClick={() => {}}>
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
