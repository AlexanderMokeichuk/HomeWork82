import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import FileInput from "../../UI/components/FileInput/FileInput";
import {selectUser} from "../Users/usersSlice";
import {Artist} from "../../type";
import {postArtist} from "./artistsThunks";

const defaultState: Artist = {
  name: "",
  description: "",
  image: null,
};

const AddNewArtist: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<Artist>(defaultState);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);


  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setFormState(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(postArtist(formState));
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

          <FileInput
            name={"image"}
            onChange={onChangeFileInput}
          />

          <TextField
            id="outlined-multiline-flexible"
            name={"description"}
            required
            multiline
            fullWidth={true}
            minRows={2}
            maxRows={10}

            value={formState.description}
            onChange={onChangeForm}
          />

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

export default AddNewArtist;