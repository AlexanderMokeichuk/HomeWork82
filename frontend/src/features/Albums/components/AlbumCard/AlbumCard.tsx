import {Box, Button, Card, CardActions, CardContent, Grid, IconButton} from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {AlbumApi} from "../../../../type";
import {Link} from "react-router-dom";
import {API_URL, PERMISSIONS_CHECK} from "../../../../constants";
import imageNotAvailable from "../../../../../public/noImage.png";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectUser} from "../../../Users/usersSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteAlbum, editIsPublishAlbum, fetchAlbumsByQuery} from "../../albumsThunks";

interface Props {
  album: AlbumApi,
  artist: string;
}

const AlbumCard: React.FC<Props> = ({album, artist}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  let cardImage = imageNotAvailable;


  if (album.image !== null) {
    cardImage = API_URL + "/" + album.image;
  }

  let trackButton = <></>;

  if (user) {
    trackButton = (
      <IconButton component={Link} to={`/tracks/${album._id}`}>
        <ArrowForwardIcon/>
      </IconButton>
    );
  }

  const deleteAlbumApi = async () => {
    if (confirm("Should I delete this album?")) {
      await dispatch(deleteAlbum(album._id));
      await dispatch(fetchAlbumsByQuery(artist));
    }
  };

  const publish = async () => {
    await dispatch(editIsPublishAlbum(album._id));
    await dispatch(fetchAlbumsByQuery(artist));
  };

  const permissionsCheck = PERMISSIONS_CHECK(user, album.isPublished);

  return (
    <Card
      style={
        permissionsCheck
          ? {display: "block"}
          : {display: "none"}
      }
      sx={{
        height: 380,
        width: 300,
      }}
    >
      <Grid item sx={{
        display: "flex",
        mt: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: {xs: 233, md: 167},
            maxWidth: {xs: 350, md: 250},
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
      <Grid item sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <CardActions>
          {trackButton}
        </CardActions>
        {user?.role === "admin"
          ? (
            <Grid item>
              <IconButton type={"button"} onClick={deleteAlbumApi}>
                <DeleteIcon/>
              </IconButton>

              <Button type={"button"} onClick={publish} sx={{color: "gray"}}>
                {!album.isPublished
                  ? "Publish"
                  : "Deactivate"
                }
              </Button>
            </Grid>
          )
          : undefined
        }
      </Grid>
    </Card>
  );
};

export default AlbumCard;