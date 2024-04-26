import React from "react";
import {InfoAlbum, TrackApi} from "../../../../type";
import {Alert, Grid} from "@mui/material";
import {API_URL} from "../../../../constants";

interface Props {
  album: InfoAlbum,
  track: TrackApi,
}

const TrackCard: React.FC<Props> = ({track, album}) => {

  return (
    <Alert icon={false} sx={{
      background: "#2F4F4F",
      borderRadius: 2,
      padding: 0,
      margin: 0,
      width: 800,
    }}>
      <Grid container display={"flex"} width={800} direction={"row"} color={"white"}>
        <span style={{marginLeft: 3}}>{track.item}</span>
        <Grid item display={"flex"} direction={"row"} gap={2}>
          <img
            width={50}
            height={50}
            src={API_URL + '/' + album.image}
            alt={"№"}
            style={{
              borderRadius: 8,
              marginLeft: 5
            }}
          />
          <Grid item xs>
            <strong style={{color: "white"}}>{track.name}</strong>
          </Grid>

        </Grid>
        <Grid item marginLeft={"auto"} marginRight={1}>
          <span style={{color: "gray"}}>{track.duration}</span>
        </Grid>
      </Grid>
    </Alert>
  );
};

export default TrackCard;