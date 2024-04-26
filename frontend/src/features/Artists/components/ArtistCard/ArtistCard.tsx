import {Card, CardActions, CardContent, CardMedia, Grid, IconButton, styled} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from "react";
import { Link } from 'react-router-dom';
import {ArtistsApi} from "../../../../type";
import {API_URL} from "../../../../constants";

interface Props {
  artist: ArtistsApi,
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

const ArtistCard: React.FC<Props> = ({artist}) => {
  return (
    <Grid item xs md={4} lg={3}>
      <Card sx={{
        width: 250,
        bgcolor: '#ADD8E6',
      }}>
        <ImageCardMedia image={API_URL + '/' + artist.image}/>
        <CardContent>
          {artist.name}
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/products/`}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistCard;