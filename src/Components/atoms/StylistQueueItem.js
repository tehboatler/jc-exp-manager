import { addMinutes, differenceInMinutes, format, parseISO } from "date-fns"
import React from "react"

export default function StylistQueueItem({
  name,
  lb,
  ub,
  remLB,
  remUB,
  index,
  arrivalTime,
}) {
  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      height: "auto",
      width: "18vw",
      marginTop: "1vh",
      //   marginVertical: "1vh",
      //   marginHorizontal: "2.5%",
      backgroundColor: "#15132C",
      borderRadius: "5.5px",
      border: "1px solid #352E6D",
      boxShadow: "0px 0px 15px #000",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      height: "2.5vh",
      width: "90%",
      paddingLeft: "1vw",
      paddingTop: "1vh",
      //   backgroundColor: "#0C0A1C",
    },
    content: {
      height: "auto",
      paddingLeft: "1vw",
      paddingTop: "0.25vh",
      paddingBottom: "1.5vh",
      color: "#D2CDFF",
      //   backgroundColor: "#0C0A1C",
      fontSize: "1.75vh",
      fontWeight: 600,
    },
  }

  const estLBEntry = format(addMinutes(new Date(), remLB), "h:mm")
  const estUBEntry = format(addMinutes(new Date(), remUB), "h:mm")
  console.log(arrivalTime)
  const timeElapsed = differenceInMinutes(new Date(), parseISO(arrivalTime))

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        {index} {name}
        <div style={styles.content}>
          {lb} - {ub}({timeElapsed})
        </div>
      </div>

      <div style={styles.content}>
        {remLB} - {remUB} [{estLBEntry} - {estUBEntry}]
      </div>
    </div>
  )
}
