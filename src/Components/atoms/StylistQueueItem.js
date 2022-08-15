import {
  addMinutes,
  differenceInMinutes,
  format,
  formatISO,
  parse,
  parseISO,
  subMinutes,
} from "date-fns"
import React from "react"

export default function StylistQueueItem({
  name,
  lb,
  ub,
  remLB,
  remUB,
  index,
  arrivalTime,
  promisedLB,
  promisedUB,
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
      userSelect: "none",
      overflow: "hidden",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      height: "2.5vh",
      width: "90%",
      paddingLeft: "1vw",
      paddingTop: "1vh",
      fontSize: "2vh",
      //   backgroundColor: "#0C0A1C",
    },
    topLeftContent: {
      height: "auto",
      paddingLeft: "1vw",
      paddingTop: "0.05vh",
      paddingBottom: "1.5vh",
      color: "#D2CDFF",
      //   backgroundColor: "#0C0A1C",
      fontSize: "1.05vh",
      fontWeight: 600,
    },
    content: {
      height: "auto",
      paddingLeft: "1vw",
      paddingTop: "0.25vh",
      paddingBottom: "0.75vh",
      color: "#D2CDFF",
      //   backgroundColor: "#0C0A1C",
      fontSize: "1.75vh",
      fontWeight: 400,
    },
    promiseContent: {
      height: "auto",
      paddingRight: "0.75vw",
      paddingLeft: "1vw",
      paddingTop: "0.05vh",
      paddingBottom: "0.75vh",
      color: "#D2CDFF",
      //   backgroundColor: "#0C0A1C",
      fontSize: "1.5vh",
      fontWeight: 600,
    },
    PAWrapper: {
      height: "auto",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#0C0A1C",
    },
    greenText: {
      color: "lightgreen",
    },
    redText: {
      color: "red",
    },
    greyText: {
      color: "#302B5C",
    },
    orangeText: {
      color: "orange",
    },
  }

  const estLBEntry = format(addMinutes(new Date(), remLB), "hh:mm")
  const estUBEntry = format(addMinutes(new Date(), remUB), "hh:mm")
  console.log(arrivalTime)
  const convertArrivalTimeToISO = parse(arrivalTime, "HH:mm", new Date())

  console.log("convertArrivalTimeToISO: ", convertArrivalTimeToISO)
  const timeElapsed = differenceInMinutes(new Date(), convertArrivalTimeToISO)
  console.log("timeElapsed: ", timeElapsed)
  const formatArrivalTimeToISO = formatISO(convertArrivalTimeToISO)
  console.log("formatArrivalTimeToISO: ", formatArrivalTimeToISO)

  console.log("promisedLB: ", promisedLB)
  const promisedTimeLB = format(
    addMinutes(parseISO(formatArrivalTimeToISO), promisedLB),
    "hh:mm"
  )
  const promisedTimeUB = format(
    addMinutes(parseISO(formatArrivalTimeToISO), promisedUB),
    "hh:mm"
  )
  const promisedReturnTimeLB = format(
    addMinutes(parseISO(formatArrivalTimeToISO), promisedLB - 5),
    "hh:mm"
  )

  console.log(
    `{promisedTimeLB: ${promisedTimeLB}, promisedTimeUB: ${promisedTimeUB}}`
  )

  const promisedLBDelta = timeElapsed - promisedLB
  const promisedUBDelta = timeElapsed - promisedUB

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <span style={name === "newClient" ? styles.greyText : null}>
          {index} {name}
        </span>
        <div style={styles.topLeftContent}>
          {promisedLB}-{promisedUB}({timeElapsed})
        </div>
      </div>

      <div style={styles.content}>
        {remLB} - {remUB} |{" "}
        <span
          style={
            promisedTimeLB >= estLBEntry
              ? styles.greenText
              : promisedTimeLB <= estUBEntry
              ? styles.orangeText
              : styles.redText
          }
        >
          {estLBEntry}
        </span>{" "}
        -{" "}
        <span
          style={
            promisedTimeUB > estUBEntry ? styles.greenText : styles.orangeText
          }
        >
          {estUBEntry}
        </span>
      </div>
      <div style={styles.PAWrapper}>
        <div style={styles.promiseContent}>
          P: [{" "}
          <span style={promisedLBDelta < 0 ? styles.greenText : styles.redText}>
            {timeElapsed - promisedLB}
          </span>{" "}
          |{" "}
          <span style={promisedUBDelta < 0 ? styles.greenText : styles.redText}>
            {timeElapsed - promisedUB}
          </span>{" "}
          ] {promisedTimeLB} - {promisedTimeUB}
        </div>
        <div style={styles.promiseContent}>A: {arrivalTime}</div>
      </div>
      <div style={styles.PAWrapper}>
        <div style={styles.promiseContent}>
          R: || <span>{promisedReturnTimeLB}</span>{" "}
        </div>
        <div style={styles.promiseContent}>
          SD: {lb}-{ub}
        </div>
      </div>
    </div>
  )
}
