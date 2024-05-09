import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAlbumById, fetchTracksFromAlbum} from "./tracksThinks";
import {selectFullInfoAlbum, selectLaudingFullInfo, selectTracks} from "./tracksSlice";
import {Box, Grid, Typography} from "@mui/material";
import Spinner from "../../UI/components/Spinner/Spinner";
import TrackCard from "./comonents/TrackCard/TrackCard";
import {selectUser} from "../Users/usersSlice";
import {API_URL} from "../../constants";

const Tracks: React.FC = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const infAlbum = useAppSelector(selectFullInfoAlbum);
  const tracks = useAppSelector(selectTracks);
  const laudingAlbum = useAppSelector(selectLaudingFullInfo);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      if (id) {
        dispatch(fetchAlbumById(id));
        dispatch(fetchTracksFromAlbum(id));
      }
    } else {
      navigate(-1);
    }
  }, [id, dispatch, user, navigate]);

  return (
    <>
      {laudingAlbum
        ? (
          <Grid container justifyContent={"center"}>
            <Spinner/>
          </Grid>
        )
        : (
          <Grid container direction={"column"}>
            <Grid
              item
              sx={{
                display: "flex",
                gap: 5,
                mt: 3,
              }}
            >
              {infAlbum?.artist.image
                ? (
                  <Box
                    component="img"
                    sx={{
                      height: 200,
                      width: 250,
                      borderRadius: 2
                    }}
                    src={`${API_URL}/${infAlbum.artist.image}`}
                  />
                )
                : undefined
              }
              <Grid item>
                <Typography gutterBottom variant="h5" component="div" color={"white"}>
                  {infAlbum?.artist.name}
                </Typography>
                <Typography variant="body2" color={"white"}>
                  {infAlbum?.artist.description}
                </Typography>
              </Grid>
            </Grid>

            <Grid container mt={5} direction={"column"} bgcolor={"gray"} padding={2} borderRadius={2}>
              <Grid
                item
                sx={{
                  display: "flex",
                }}
              >
                <Grid item width={"30%"} sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  {infAlbum !== null && infAlbum.image !== null
                    ? (
                      <Box
                        component="img"
                        sx={{
                          height: 250,
                          width: 280,
                        }}
                        src={`${API_URL}/${infAlbum.image}`}
                      />
                    )
                    : undefined
                  }
                  <Typography variant={"h5"}>
                    {infAlbum?.name}
                  </Typography>
                </Grid>

                <Grid item xs display={"flex"} flexDirection={"column"} gap={2}>
                  {tracks.map((track) => {
                    return (
                      <TrackCard
                        key={track._id}
                        track={track}
                        album={infAlbum!}
                      />
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        )
      }
    </>
  );
};

export default Tracks;