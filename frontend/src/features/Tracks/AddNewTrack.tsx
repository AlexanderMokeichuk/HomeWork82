import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Button, Grid, SelectChangeEvent, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {selectUser} from "../Users/usersSlice";
import {Track} from "../../type";
import {selectArtists} from "../Artists/artistsSlice";
import {fetchArtists} from "../Artists/artistsThunks";
import {selectAlbums} from "../Albums/albumsSlice";
import {fetchAlbumsByQuery} from "../Albums/albumsThunks";
import {postTrack} from "./tracksThinks";

const defaultState: Track = {
  name: "",
  album: "",
  item: "",
  duration: "",
};

const AddNewTrack: React.FC = () => {
  const navigate = useNavigate();
  const [artist, setArtist] = React.useState<string[]>([]);
  const [album, setAlbum] = React.useState<string[]>([]);
  const [formState, setFormState] = useState<Track>(defaultState);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);


  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      dispatch(fetchArtists());
      if (artist.length) {
        dispatch(fetchAlbumsByQuery(artist[0]));
      }
    }
  }, [dispatch, user, navigate, artist]);

  const handleChangeArtist = (event: SelectChangeEvent<typeof artist>) => {
    const {
      target: {value},
    } = event;
    setArtist(
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const handleChangeAlbum = (event: SelectChangeEvent<typeof album>) => {
    const {
      target: {value},
    } = event;
    setAlbum(
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    let number = 1;
    if (name === "price") {
      number = parseInt(value);
    }

    if (number > 0) {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(postTrack({
      name: formState.name,
      album: album[0],
      item: formState.item,
      duration: formState.duration,
    }));
    setAlbum([""]);
    setArtist([""]);
    setFormState(defaultState);
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      bgcolor={"white"}
      padding={5}
      borderRadius={4}
      mt={5}
    >
      <form onSubmit={onSubmit}>
        <Grid
          item
          sx={{
            width: 700,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            id="input-with-sx"
            name={"name"}
            label="Name"
            required

            value={formState.name}
            onChange={onChangeForm}
          />

          <TextField
            id="input-with-sx"
            name={"item"}
            label="Item"
            type={"number"}
            required

            value={formState.item}
            onChange={onChangeForm}
          />


          <TextField
            id="outlined-multiline-flexible"
            name={"duration"}
            label={"Duration"}
            required
            multiline

            value={formState.duration}
            onChange={onChangeForm}
          />


          <div>
            <FormControl sx={{m: 1, width: "100%"}}>
              <InputLabel id="demo-multiple-name-label">Artists</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                required
                value={artist}
                onChange={handleChangeArtist}
                input={<OutlinedInput label="Artists"/>}
              >
                {artists.map((artist) => (
                  <MenuItem
                    key={artist._id}
                    value={artist._id}
                  >
                    {artist.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <FormControl sx={{m: 1, width: "100%"}}>
              <InputLabel id="demo-multiple-name-label">Albums</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                required
                value={album}
                onChange={handleChangeAlbum}
                input={<OutlinedInput label="Albums"/>}
              >
                {albums.map((album) => (
                  <MenuItem
                    key={album._id}
                    value={album._id}
                  >
                    {album.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Button
            variant="contained"
            aria-label="Basic button group"
            type={"submit"}
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: "auto"
            }}
          >
            Send
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default AddNewTrack;