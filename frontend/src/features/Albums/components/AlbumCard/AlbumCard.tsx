import {Card, CardActions, CardContent, CardMedia, IconButton, styled} from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {AlbumApi} from "../../../../type";
import {Link} from "react-router-dom";
import {API_URL} from "../../../../constants";

interface Props {
  album: AlbumApi,
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

const AlbumCard: React.FC<Props> = ({album}) => {
  console.log(album.createdAt);
  return (
      <Card sx={{
        height: 300,
        width: 300,
      }}>
        <ImageCardMedia image={API_URL + '/' + album.image}/>
        <CardContent>
          <p>
            <strong>{album.name}</strong>
          </p>
          <strong>{album.createdAt}.г</strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/products/`}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
  );
};

export default AlbumCard;