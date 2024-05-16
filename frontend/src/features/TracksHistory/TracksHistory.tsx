import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../Users/usersSlice";
import {useNavigate} from "react-router-dom";
import {fetchTrackHistory} from "./tracksHistoryThunks";
import {selectHistory, selectTracksHistoryLauding} from "./tracksHistorySlice";
import {Grid} from "@mui/material";
import TrackHistoryCard from "./components/TrackHistoryCard/TrackHistoryCard";
import Spinner from "../../UI/components/Spinner/Spinner";
import OwnAlert from "../../UI/components/OwnAlert/OwnAlert";

const TracksHistory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const tracks = useAppSelector(selectHistory);
  const lauding = useAppSelector(selectTracksHistoryLauding);


  useEffect(  () => {
    if (user) {
      dispatch(fetchTrackHistory());
    } else {
      navigate("/");
    }
  }, [navigate, user, dispatch]);

  return (
    <>
      {lauding
        ? (
          <Grid container justifyContent={"center"}>
            <Spinner />
          </Grid>
        )
        : (
          <>
            {
              !tracks.length
                ? (
                  <OwnAlert>
                    History is empty!!
                  </OwnAlert>
                )
                : undefined
            }

            <Grid container justifyContent={"center"} padding={2} gap={2}>
              {tracks.map((item) => {
                return <TrackHistoryCard key={item._id} item={item} />;
              })}
            </Grid>
          </>
        )
      }
    </>
  );
};

export default TracksHistory;