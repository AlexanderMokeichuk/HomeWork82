import {Box, Button, Card, CardActions, CardContent, Grid, IconButton} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import {Link} from "react-router-dom";
import {ArtistsApi} from "../../../../type";
import {API_URL, PERMISSIONS_CHECK} from "../../../../constants";
import imageNotAvailable from "../../../../../public/noImage.png";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectUser} from "../../../Users/usersSlice";
import {deleteArtist, editIsPublishArtist, fetchArtists} from "../../artistsThunks";

interface Props {
  artist: ArtistsApi,
}


const ArtistCard: React.FC<Props> = ({artist}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  let cardImage = imageNotAvailable;

  if (artist.image !== null) {
    cardImage = API_URL + '/' + artist.image;
  }

  const deleteAlbumApi = async () => {
    if (confirm("Should I delete this artist?")) {
      await dispatch(deleteArtist(artist._id));
      await dispatch(fetchArtists());
    }
  };

  const publish = async () => {
    await dispatch(editIsPublishArtist(artist._id));
    await dispatch(fetchArtists());
  };


  const permissionsCheck = PERMISSIONS_CHECK(user, artist.isPublished);

  return (
    <Grid
      item
      xs
      md={4}
      lg={3}
      style={
      permissionsCheck
        ? {display: "block"}
        : {display: "none"}
      }
    >
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
        <Grid item sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <CardActions>
            <IconButton component={Link} to={`/albums/${artist._id}`}>
              <ArrowForwardIcon/>
            </IconButton>
          </CardActions>
          {user?.role === "admin"
            ? (
              <Grid item>
                <IconButton type={"button"} onClick={deleteAlbumApi}>
                  <DeleteIcon/>
                </IconButton>
                <Button type={"button"} onClick={publish} sx={{color: "gray"}}>
                  {!artist.isPublished
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
    </Grid>
  );
};

export default ArtistCard;