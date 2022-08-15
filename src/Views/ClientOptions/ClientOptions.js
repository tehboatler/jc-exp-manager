import React, { useContext, useState } from "react"
import { ClientListv3 } from "../../Context/ClientListv3"
import { useFormik } from "formik"

export default function ClientOptions() {
  const {
    clientOptionsVisible,
    setClientOptionsVisible,
    clientList,
    setClientList,
    currentClientIDToEdit,
    stylists,
    setStylists,
  } = useContext(ClientListv3)

  const [pushToStylistVisibility, setPushToStylistVisibility] = useState(false)

  // Filter clientList by ID
  const clientToEdit = clientList.filter(
    (client) => client.id === currentClientIDToEdit
  )

  const styles = {
    backgroundRoot: {
      display: `${clientOptionsVisible ? "block" : "none"}`,
      position: "absolute",
      backgroundColor: "black",
      width: "100%",
      height: "100%",
      opacity: "0.5",
    },
    root: {
      display: `${clientOptionsVisible ? "block" : "none"}`,
      position: "absolute",
      color: "white",
      backgroundColor: "black",
      border: "2px solid #15132C",
      borderRadius: "1vh",
      width: "90%",
      height: "90%",
      marginLeft: "5%",
      marginTop: "2.5%",
      overflow: "hidden",
      boxShadow: "1px 1px 50px #000",
    },
    pushToStylistWrapper: {
      display: `${pushToStylistVisibility ? "flex" : "none"}`,
      position: "absolute",
      flexDirection: "column",
      justifyContent: "center",
      color: "white",
      backgroundColor: "black",
      border: "2px solid #15132C",
      borderRadius: "1vh",
      width: "90%",
      height: "90%",
      marginLeft: "5%",
      marginTop: "2.5%",
      overflow: "hidden",
      boxShadow: "1px 1px 50px #000",
      zIndex: "1",
    },
    pushToStylistButton: {
      flex: 1,
      backgroundColor: "#0C0A1C",
      fontSize: "2.5rem",
      color: "white",
    },
    pushToStylistBackButton: {
      flex: 1,
      backgroundColor: "red",
    },
    header: {
      height: "5vh",
      width: "100%",
      backgroundColor: "#15132C",
      lineHeight: "5vh",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      backgroundColor: "#0C0A1C",
    },
    TopTabNavigator: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "10vh",
      width: "100%",
      backgroundColor: "#070610",
    },
    removeClientButton: {
      marginLeft: "1%",
      height: "8vh",
      lineHeight: "8vh",
      marginVertical: "1vh",
      width: "20%",
      color: "white",
      backgroundColor: "#FF005C",
      borderRadius: "1vh",
    },
    pushToStylist: {
      marginRight: "1%",
      height: "8vh",
      lineHeight: "8vh",
      marginVertical: "1vh",
      width: "20%",
      color: "white",
      backgroundColor: "#315EFF",
      borderRadius: "1vh",
    },
    backAndSaveButtonWrapper: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "15vh",
      backgroundColor: "grey",
    },
    backButton: {
      width: "50%",
      height: "100%",
      backgroundColor: "#FF005C",
    },
    saveButton: {
      width: "50%",
      height: "100%",
      backgroundColor: "#315EFF",
    },
    propertiesWrapper: {
      flexDirection: "column",
      alignItems: "flex-start",
      display: "flex",
      marginTop: "5vh",
      width: "75%",
      //   backgroundColor: "grey",
    },
    propertyAndField: {
      display: "flex",
      height: "auto",
      width: "100%",
    },
    property: {
      paddingLeft: "2.5%",
      lineHeight: "8vh",
      height: "8vh",
      width: "auto",
      color: "white",
      fontSize: "4vh",
      fontWeight: "bold",
    },
    textField: {
      marginLeft: "2.5%",
      width: "100%",
      backgroundColor: "transparent",
      color: "#7528FF",
      fontSize: "4vh",
      borderStyle: "none",
      paddingLeft: "2.5%",
      marginTop: "0.5%",
      marginRight: "2.5%",
      outline: "none",
    },
  }

  console.log("CLIENT: ", clientToEdit[0] || "")

  // Formik Initialization
  const formik = useFormik({
    initialValues: {
      name: clientToEdit[0]?.name ?? "",
      lowerBound: clientToEdit[0]?.lowerBound ?? "",
      upperBound: clientToEdit[0]?.upperBound ?? "",
      arrivalTime: clientToEdit[0]?.arrivalTime ?? "",
      promisedLB: clientToEdit[0]?.promisedLB ?? "",
      promisedUB: clientToEdit[0]?.promisedUB ?? "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  console.log("formikValues: ", formik.values)

  // Remove Client from clientList
  const removeClient = () => {
    setClientList(
      clientList.filter((client) => client.id !== currentClientIDToEdit)
    )
    setClientOptionsVisible(false)
  }

  // Save Changes
  const saveData = () => {
    console.log("formikValues: ", formik.values)
    // Update ClientListv3 with new values
    setClientList((prevState) => {
      return prevState.map((client) => {
        if (client.id === currentClientIDToEdit) {
          return { ...client, ...formik.values }
        } else {
          return client
        }
      })
    })
    setClientOptionsVisible(false)
  }

  // Push Client to Stylist
  const pushToStylist = (name) => {
    // find stylist with name
    const stylist = stylists.find((stylist) => stylist.stylistName === name)
    // set totalWaitTimeLB and totalWaitTimeUB to clientID bounds
    setStylists((prevState) => {
      return prevState.map((stylist) => {
        if (stylist.stylistName === name) {
          return {
            ...stylist,
            totalWaitTimeLB: formik.values.lowerBound,
            totalWaitTimeUB: formik.values.upperBound,
          }
        } else {
          return stylist
        }
      })
    })
    setPushToStylistVisibility(false)
    removeClient()
  }

  return (
    <>
      <div style={styles.backgroundRoot}></div>
      <div style={styles.pushToStylistWrapper}>
        {stylists.map((stylist) => (
          <button
            style={styles.pushToStylistButton}
            onClick={() => pushToStylist(stylist.stylistName)}
          >
            {stylist.stylistName}
          </button>
        ))}

        <button
          style={styles.pushToStylistBackButton}
          onClick={() => setPushToStylistVisibility(false)}
        ></button>
      </div>
      <div style={styles.root}>
        <div style={styles.header}>Client Options</div>
        <div style={styles.body}>
          <div style={styles.TopTabNavigator}>
            <div
              style={styles.removeClientButton}
              onClick={() => removeClient()}
            >
              Remove
            </div>
            <div
              style={styles.pushToStylist}
              onClick={() => setPushToStylistVisibility(true)}
            >
              Push
            </div>
          </div>
          <div style={styles.propertiesWrapper}>
            <div style={styles.propertyAndField}>
              <div style={styles.property}>Name: </div>
              <input
                autoFocus={true}
                style={styles.textField}
                id="name"
                name="name"
                type="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            <div style={styles.propertyAndField}>
              <div style={styles.property}>Upperbound: </div>
              <input
                style={styles.textField}
                id="upperBound"
                name="upperBound"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.upperBound}
              />
            </div>
            <div style={styles.propertyAndField}>
              <div style={styles.property}>Lowerbound: </div>
              <input
                style={styles.textField}
                id="lowerBound"
                name="lowerBound"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.lowerBound}
              />
            </div>
            <div style={styles.propertyAndField}>
              <div style={styles.property}>Arrival: </div>
              <input
                style={styles.textField}
                id="arrivalTime"
                name="arrivalTime"
                type="time"
                onChange={formik.handleChange}
                value={formik.values.arrivalTime}
              />
            </div>
            <div style={styles.propertyAndField}>
              <div style={styles.property}>PromisedUB: </div>
              <input
                style={styles.textField}
                id="promisedUB"
                name="promisedUB"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.promisedUB}
              />
            </div>
            <div style={styles.propertyAndField}>
              <div style={styles.property}>PromisedLB: </div>
              <input
                style={styles.textField}
                id="promisedLB"
                name="promisedLB"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.promisedLB}
              />
            </div>
          </div>
          <div style={styles.backAndSaveButtonWrapper}>
            <div
              style={styles.backButton}
              onClick={() => {
                setClientOptionsVisible(false),
                  formik.resetForm({
                    values: {
                      name: "",
                      lowerbound: "",
                      upperbound: "",
                      arrivalTime: "",
                      promisedUB: "",
                      promisedLB: "",
                    },
                  })
              }}
            ></div>
            <div
              style={styles.saveButton}
              onClick={() => {
                saveData()
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}
