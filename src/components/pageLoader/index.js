import { randomRange } from "../../utils/common";
import { Grid } from "@mui/material";

const PageLoader = () => {
  return (
    <>
      <Grid container spacing={2}>
        {randomRange(8).map((idx) => {
          return (
            <Grid item xs={4} md={3} key={idx}>
              <img
                src="gifs/page_loader.gif"
                alt="loader"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "6px",
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default PageLoader;
