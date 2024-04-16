import express from "express";
import {imagesUpload} from "../multer";
import {AlbumFront} from "../type";
import Album from "../models/Album";
import mongoose from "mongoose";

const albumsRouter = express.Router();

albumsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  if (!req.body.name || !req.body.singer || !req.body.createdAt) {
    return res.status(400).json({error: "Incorrect data"});
  }

  try {
    const postAlbum: AlbumFront = {
      name: req.body.name,
      singer: req.body.singer,
      createdAt: req.body.createdAt,
      image: req.file ? req.file.filename : null,
    };

    const album = new Album(postAlbum);
    await album.save();

    return res.send({
      ...postAlbum,
      _id: album._id
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

albumsRouter.get("/", async (req, res, next) => {
  const query = req.query.artist as string;
  try {
    if (query) {
      if (!mongoose.Types.ObjectId.isValid(query)) {
        return res.status(422).send({ error: 'Not found singer!!' });
      }
      const singerAlbum = await Album.find({singer: query});
      return res.send(singerAlbum);
    }

    const albums = await Album.find();
    return res.send(albums);
  } catch (e) {
    next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const albums = await Album.find({ _id: id }).populate(
      'singer',
      'name description image'
    );
    const album = albums[0];
    return res.send(album);
  } catch (error) {
    next(error);
  }
});

export default albumsRouter;