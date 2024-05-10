import React from "react";
import {InfoAlbum, TrackApi} from "../../../../type";
import {Alert, Box, Button, Grid, IconButton, useTheme} from "@mui/material";
import {API_URL} from "../../../../constants";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectUser} from "../../../Users/usersSlice";
import {postTrackHistory} from "../../../TracksHistory/tracksHistoryThunks";
import imageNotAvailable from "../../../../../public/noImage.png";
import {selectLaudingButton} from "../../../TracksHistory/tracksHistorySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteTrack, editIsPublishTrack, fetchTracksFromAlbum} from "../../tracksThinks";


interface Props {
  album: InfoAlbum,
  track: TrackApi,
}

const TrackCard: React.FC<Props> = ({track, album}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const laudingButton = useAppSelector(selectLaudingButton);


  const postHistory = async () => {
    if (user) {
      await dispatch(postTrackHistory({track: track._id, token: user.token, artist: album.artist._id}));
    }
  };

  let cardImage = imageNotAvailable;

  if (album.image !== null) {
    cardImage = API_URL + '/' + album.image;
  }


  const deleteAlbumApi = async () => {
    await dispatch(deleteTrack(track._id));
    await dispatch(fetchTracksFromAlbum(album._id));
  };

  const publish = async () => {
    await dispatch(editIsPublishTrack(track._id));
    await dispatch(fetchTracksFromAlbum(album._id));
  };

  return (
    <Alert
      style={user?.role === "user" || !user && !track.isPublished
        ? {display: "none"}
        : {display: "block"}
      }
      icon={false}
      sx={{
      background: "#2F4F4F",
      borderRadius: 2,
      padding: 0,
      margin: 0,
      width: 800,
    }}>
      <Grid container display={"flex"} width={800} direction={"row"} color={"white"}>
        <span style={{marginLeft: 3}}>{track.item}</span>
        <Grid item xs sx={{
          display: "flex",
          direction: "row",
          gap: 2,
        }}>
          <img
            width={50}
            height={50}
            src={cardImage}
            alt={"№"}
            style={{
              borderRadius: 8,
              marginLeft: 5
            }}
          />

          <Grid item xs>
            <Box sx={{ whiteSpace: "pre-wrap" }} minWidth={150} maxWidth={150}>{track.name}</Box>
          </Grid>

          <Grid container border={1} borderRadius={2} marginRight={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">
                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
              </IconButton>
              <IconButton aria-label="play/pause" onClick={postHistory} disabled={laudingButton}>
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="next">
                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
              </IconButton>
            </Box>
          </Grid>

          </Grid>

        <Grid
          item
          marginLeft={"auto"}
          marginRight={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span style={{color: "gray"}}>{track.duration}</span>
          {user?.role === "admin"
            ? (
              <Grid item>
                <IconButton type={"button"} onClick={deleteAlbumApi}>
                  <DeleteIcon/>
                </IconButton>
                <Button type={"button"} onClick={publish} sx={{color: "gray"}}>
                  {track.isPublished
                    ? "Publish"
                    : "Deactivate"
                  }
                </Button>
              </Grid>
            )
            : undefined
          }
        </Grid>
      </Grid>
    </Alert>
  );
};

export default TrackCard;