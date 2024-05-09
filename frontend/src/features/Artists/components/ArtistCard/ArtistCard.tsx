import {Box, Card, CardActions, CardContent, Grid, IconButton} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import {Link} from "react-router-dom";
import {ArtistsApi} from "../../../../type";
import {API_URL} from "../../../../constants";
import imageNotAvailable from "../../../../../public/noImage.png";

interface Props {
  artist: ArtistsApi,
}


const ArtistCard: React.FC<Props> = ({artist}) => {
  let cardImage = imageNotAvailable;

  if (artist.image !== null) {
    cardImage = API_URL + '/' + artist.image;
  }

  return (
    <Grid item xs md={4} lg={3}>
      <Card sx={{
        width: 250,
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
        <CardContent>
          {artist.name}
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/albums/${artist._id}`}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistCard;