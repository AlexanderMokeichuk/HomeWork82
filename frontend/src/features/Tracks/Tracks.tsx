import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAlbumById, fetchTracksFromAlbum} from "./tracksThinks";
import {selectFullInfoAlbum, selectLaudingFullInfo, selectLaudingTracks, selectTracks} from "./tracksSlice";
import {Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import Spinner from "../../Ul/components/Spinner/Spinner";
import {API_URL, IMAGE_CARD_MEDIA} from "../../constants";
import TrackCard from "./comonents/TrackCard/TrackCard";

const Tracks: React.FC = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const infAlbum = useAppSelector(selectFullInfoAlbum);
  const tracks = useAppSelector(selectTracks);
  const laudingAlbum = useAppSelector(selectLaudingFullInfo);
  const laudingTraks = useAppSelector(selectLaudingTracks);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbumById(id));
      dispatch(fetchTracksFromAlbum(id));
    }
  }, [id, dispatch]);

  return (
    <Grid container direction={"column"}>
      <Grid item xs mt={2}>
        {laudingAlbum
          ? (
            <Grid container justifyContent={'center'}>
              <Spinner />
            </Grid>
          )
          : (
            <Card sx={{ maxWidth: 300 }}>
              <CardActionArea>
                <IMAGE_CARD_MEDIA image={API_URL + '/' + infAlbum?.artist.image}/>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {infAlbum?.artist.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {infAlbum?.artist.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        }
      </Grid>

      <Grid item xs mt={5} direction={"column"} bgcolor={"gray"} padding={2} borderRadius={2}>
        {laudingTraks
          ? (
            <Grid container justifyContent={'center'}>
              <Spinner />
            </Grid>
          )
          : (
            <Grid container gap={2}>
              <Card sx={{ width: 300, height: 300 }}>
                <CardActionArea>
                  <IMAGE_CARD_MEDIA image={API_URL + '/' + infAlbum?.image}/>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {infAlbum?.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

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
          )
        }
      </Grid>
    </Grid>
  );
};

export default Tracks;