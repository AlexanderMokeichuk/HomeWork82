import {Card, CardActions, CardContent, Grid, IconButton} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import {Link} from "react-router-dom";
import {ArtistsApi} from "../../../../type";
import {API_URL, IMAGE_CARD_MEDIA} from "../../../../constants";

interface Props {
  artist: ArtistsApi,
}


const ArtistCard: React.FC<Props> = ({artist}) => {
  return (
    <Grid item xs md={4} lg={3}>
      <Card sx={{
        width: 250,
        bgcolor: '#ADD8E6',
      }}>
        <IMAGE_CARD_MEDIA image={API_URL + '/' + artist.image}/>
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