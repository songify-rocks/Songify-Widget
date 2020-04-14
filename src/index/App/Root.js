import React, {Fragment} from "react"
import "./Widget/Widget.css"
import Widget from "./Widget"
import {useParams} from "react-router-dom"
import Generator from "./Widget/Generator"

function Root() {
    const { id } = useParams()
    const urlParams = new URLSearchParams(window.location.search)

    return (
        <Fragment>
            {id == null ? <Generator /> : 
            <Widget 
              id={id}
              transparency={urlParams.get("transparency")}
              corners={urlParams.get("corners")}
              limit={3000}
              dir={urlParams.get("dir")}
              speed={urlParams.get("speed")}
              position={urlParams.get("position")}
            />}
        </Fragment>
  )
}

export default Root