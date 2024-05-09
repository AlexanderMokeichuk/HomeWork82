import {Box, Card, CardActions, CardContent, Grid, IconButton} from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {AlbumApi} from "../../../../type";
import {Link} from "react-router-dom";
import {API_URL} from "../../../../constants";
import imageNotAvailable from "../../../../../public/noImage.png";
import {useAppSelector} from "../../../../app/hooks";
import {selectUser} from "../../../Users/usersSlice";

interface Props {
  album: AlbumApi,
}

const AlbumCard: React.FC<Props> = ({album}) => {
  const user = useAppSelector(selectUser);

  let cardImage = imageNotAvailable;


  if (album.image !== null) {
    cardImage = API_URL + '/' + album.image;
  }

  let trackBatton = <></>;

  if (user) {
    trackBatton = (
      <IconButton component={Link} to={`/tracks/${album._id}`}>
        <ArrowForwardIcon/>
      </IconButton>
    );
  }

  return (
      <Card sx={{
        height: 380,
        width: 300,
      }}>
        <Grid item sx={{
          display: "flex",
          mt: 2,
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: "center"
        }}>
          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            src={cardImage}
          />
        </Grid>
        <CardContent>
          <p>
            <strong>{album.name}</strong>
          </p>
          <strong>{album.createdAt}.г</strong>
        </CardContent>
        <CardActions>
          {trackBatton}
        </CardActions>
      </Card>
  );
};

export default AlbumCard;