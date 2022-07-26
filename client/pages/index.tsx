import type { NextPage } from "next";
import { MainInfo } from "../src/component/MainPage/MainInfo";
import { TodaySpelling } from "../src/component/MainPage/TodaySpelling";
import { SearchBar } from "../src/component/SearchPage/SearchBar";

import Grid from "@mui/material/Grid";

const Home: NextPage = () => {
  return (
    <Grid container spacing={6} sx={{ maxWidth: "1200px" }}>
      <Grid item xs={12} md={12}>
        <SearchBar />
      </Grid>
      <Grid item xs={12} md={3}>
        <TodaySpelling />
      </Grid>
      <Grid item xs={12} md={9}>
        <MainInfo />
      </Grid>
    </Grid>
  );
};

export default Home;
