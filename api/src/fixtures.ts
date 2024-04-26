import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Tracks from "./routers/tracks";
import Track from "./models/Track";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, sipping drop..`);
  }
};

const collections = ["artists", "albums, tracks"];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  const [artistOne, artistTwo] = await Artist.create({
    name: "Скриптонит",
    image: "fixtures/scrip.jpeg",
    description: "Скриптони́т — казахстанский исполнитель и музыкальный продюсер, основатель лейбла Musica36."
  }, {
    name: "Oxxxymiron",
    image: "fixtures/oxxxymiron.webp",
    description: "Oxxxymiron (Оксимиро́н; настоящее имя — Миро́н Я́нович Фёдоров; род. 31 января 1985, Ленинград) — российский рэп-исполнитель, поэт-песенник и общественный ..."
  });

  const [albumOne, albumTwo, albumThree, albumFour] = await Album.create({
    name: "Горгород",
    artist: artistTwo,
    createdAt: 2015,
    image: "fixtures/gorgorod.png",
  }, {
    name: "Красота и Уродство (Beauty & Ugliness) Oxxxymiron",
    artist: artistTwo,
    createdAt: 2021,
    image: "fixtures/oxxxyKrasota.png",
  }, {
    name: "Дом с нормальными явлениями",
    artist: artistOne,
    createdAt: 2015,
    image: "fixtures/homeScrip.jpeg",
  }, {
    name: "Уроборос: Улица 36",
    artist: artistOne,
    createdAt: 2017,
    image: "fixtures/uroboros.jpg",
  },);

  await Track.create({
    name: "Не сначала",
    album: albumOne,
    item: 1,
    duration: "2:05",
  }, {
    name: "Всего лишь писатель",
    album: albumOne,
    item: 2,
    duration: "3:29",
  }, {
    name: "Переплетено",
    album: albumOne,
    item: 3,
    duration: "4:51",
  }, {
    name: "Полигон",
    album: albumOne,
    item: 4,
    duration: "3:40",
  },{
    name: "Колыбельная",
    album: albumOne,
    item: 5,
    duration: "3:18",
  },{
    name: "Хоп-механика",
    album: albumTwo,
    item: 1,
    duration: "2:16",
  },{
    name: "Агент",
    album: albumTwo,
    item: 2,
    duration: "3:34",
  },{
    name: "Красота и уродство",
    album: albumTwo,
    item: 3,
    duration: "2:39",
  },{
    name: "Нон-фикшин",
    album: albumTwo,
    item: 4,
    duration: "3:35",
  },{
    name: "Мы все умрем",
    album: albumTwo,
    item: 5,
    duration: "2:46",
  },{
    name: "Интро",
    album: albumThree,
    item: 1,
    duration: "1:19",
  },{
    name: "Оставь это нам",
    album: albumThree,
    item: 2,
    duration: "1:40",
  },{
    name: "Коньяк",
    album: albumThree,
    item: 3,
    duration: "2:22",
  },{
    name: "Притон",
    album: albumThree,
    item: 4,
    duration: "3:56",
  },{
    name: "Дома",
    album: albumThree,
    item: 5,
    duration: "3:33",
  },{
    name: "Мистер 718",
    album: albumFour,
    item: 1,
    duration: "3:47",
  },{
    name: "Внатуре",
    album: albumFour,
    item: 2,
    duration: "4:12",
  },{
    name: "Животные",
    album: albumFour,
    item: 3,
    duration: "3:03",
  },{
    name: "Пацан",
    album: albumFour,
    item: 4,
    duration: "2:57",
  },{
    name: "Положение",
    album: albumFour,
    item: 5,
    duration: "4:43",
  });

  await db.close();
};

void run();