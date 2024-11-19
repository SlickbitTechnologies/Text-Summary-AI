// import { Outlet } from "react-router-dom"
import Header from "../components/Header";
import { Grid } from "@mui/material";
import MenuGenerator from "../MenuGenerator";
import DocSummary from "../DocSummary";

const DashboardLayout = () => {
  return (
    <Grid sx={{}}>
      <Header />
      <Grid>
        {/* <MenuGenerator /> */}
        <DocSummary />
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
