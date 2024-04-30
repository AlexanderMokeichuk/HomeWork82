import React from "react";
import {Alert, Grid} from "@mui/material";
import {TracksHistoryApi} from "../../../../type";

interface Props {
  item: TracksHistoryApi,
}
const TrackHistoryCard: React.FC<Props> = ({item}) => {
  return (
    <Alert icon={false} sx={{
      background: "#2F4F4F",
      borderRadius: 2,
      padding: 0,
      margin: 0,
      width: 800,
    }}>
      <Grid container display={"flex"} width={800} direction={"column"} padding={1} color={"white"}>
        <span>{item.track.name}</span>
        <span style={{fontSize: 11, color: "gray"}}>{item.artist.name}</span>
      </Grid>
    </Alert>
  );
};

export default TrackHistoryCard;