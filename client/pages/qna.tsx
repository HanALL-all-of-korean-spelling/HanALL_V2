import type { NextPage } from "next";
import { QuestionInput } from "../src/component/QnaPage/QuestionInput";
import { QuestionList } from "../src/component/QnaPage/QuestionList";
import Grid from "@mui/material/Grid";

const Qna: NextPage = () => {
  return (
    <Grid container spacing={6} sx={{ maxWidth: "800px" }}>
      <Grid item xs={12} md={4}>
        <QuestionInput />
      </Grid>
      <Grid item xs={12} md={8}>
        <QuestionList />
      </Grid>
    </Grid>
  );
};

export default Qna;
