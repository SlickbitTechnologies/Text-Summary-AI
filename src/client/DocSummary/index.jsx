import { Button, ButtonGroup, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import GroupButton from "../components/GroupButton";
import { useDispatch } from "react-redux";
import { clearDocSummary } from "../context/reducers/DocSummaryReducer";
const Translator = React.lazy(() => import("./Translator"));
const Summarize = React.lazy(() => import("./Summarize"));

const DocSummary = () => {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearDocSummary());
  }, []);
  return (
    <Grid container sx={{ padding: 2 }}>
      <Grid container sx={{ justifyContent: "center" }}>
        <GroupButton
          buttons={["Summarize", "Translate"]}
          selected={selected}
          onClick={setSelected}
        />
      </Grid>
      {selected == 1 ? <Translator /> : <Summarize />}
    </Grid>
  );
};

export default DocSummary;
