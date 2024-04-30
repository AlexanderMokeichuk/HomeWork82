import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../Users/usersSlice";
import {useNavigate} from "react-router-dom";
import {fetchTrackHistory} from "./tracksHistoryThunks";
import {selectHistory} from "./tracksHistorySlice";
import {Grid} from "@mui/material";
import TrackHistoryCard from "./components/TrackHistoryCard/TrackHistoryCard";

const TracksHistory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const tracks = useAppSelector(selectHistory);


  useEffect(  () => {
    if (user) {
      dispatch(fetchTrackHistory(user.token));
    } else {
      navigate("/");
    }
  }, [navigate, user, dispatch]);

  console.log(tracks);
  return (
    <Grid container justifyContent={"center"} padding={2} gap={2}>
      {tracks.map((item) => {
        return <TrackHistoryCard key={item._id} item={item} />;
      })}
    </Grid>
  );
};

export default TracksHistory;