import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Widget/Widget.css";
import Widget from "./Widget";
// import { useParams } from "react-router-dom";
import Generator from "./Widget/Generator";

function Root() {
  const { id } = useParams();
  const idInUrl = checkForUUID(id);
  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get("id");

  useEffect(() => {
    if (id === "demo") {
      window.location.href =
        "https://widget.songify.rocks/4c7e74a6-00b4-4344-8021-e6296f601e3e";
    }
  }, [id]);

  return (
    <Fragment>
      {urlParams.entries().next().done || (!idInUrl && !hasMultipleParams()) ? (
        <Generator id={idInUrl ? id : paramId} useParam={!idInUrl} />
      ) : (
        <Widget
          id={idInUrl ? id : paramId}
          transparency={urlParams.get("transparency")}
          corners={urlParams.get("corners")}
          limit={3000}
          dir={urlParams.get("dir")}
          speed={urlParams.get("speed")}
          position={urlParams.get("position")}
          cover={urlParams.get("cover") || false}
          showHideOnChange={urlParams.get("showHideOnChange") || false}
          showAnimation={urlParams.get("showAnimation")}
          hideAnimation={urlParams.get("hideAnimation")}
          showDuration={urlParams.get("showDuration")}
          canvas={urlParams.get("canvas")}
          enableScroll={urlParams.get("enableScroll")}
          scrollAnimation={urlParams.get("scrollAnimation")}
        />
      )}
    </Fragment>
  );
}

function checkForUUID(id) {
  const regex = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/g;
  return regex.test(id);
}

function hasMultipleParams() {
  return window.location.search.split("&").length > 1;
}

export default Root;
