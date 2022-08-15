import React, { useContext, useState } from "react"
import { ClientListv3 } from "../../Context/ClientListv3"
import { useFormik } from "formik"

export default function StylistMenu() {
  const { stylists, setStylists, stylistMenuToggle, setStylistMenuToggle } =
    useContext(ClientListv3)

  // Filter clientList by ID
  const styles = {
    backgroundRoot: {
      display: `${stylistMenuToggle ? "block" : "none"}`,
      position: "absolute",
      backgroundColor: "black",
      width: "100%",
      height: "100%",
      opacity: "0.5",
    },
    root: {
      display: `${stylistMenuToggle ? "block" : "none"}`,
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
  }

  return (
    <>
      <div style={styles.backgroundRoot}></div>
      <div style={styles.root}></div>
    </>
  )
}
