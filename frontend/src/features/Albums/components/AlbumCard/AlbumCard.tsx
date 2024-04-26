import {Card, CardActions, CardContent, IconButton} from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {AlbumApi} from "../../../../type";
import {Link} from "react-router-dom";
import {API_URL, IMAGE_CARD_MEDIA} from "../../../../constants";

interface Props {
  album: AlbumApi,
}

const AlbumCard: React.FC<Props> = ({album}) => {
  return (
      <Card sx={{
        height: 350,
        width: 300,
      }}>
        <IMAGE_CARD_MEDIA image={API_URL + '/' + album.image}/>
        <CardContent>
          <p>
            <strong>{album.name}</strong>
          </p>
          <strong>{album.createdAt}.г</strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/tracks/${album._id}`}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
  );
};

export default AlbumCard;