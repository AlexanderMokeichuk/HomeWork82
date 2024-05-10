import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Tracks from "./routers/tracks";
import Track from "./models/Track";
import User from "./models/User";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, sipping drop..`);
  }
};

const collections = ["artists", "albums", "tracks", "users"];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  await User.create(
    {
      username: 'Alex',
      password: '1234',
      token: crypto.randomUUID(),
      role: "admin"
    },
    {
      username: 'Evgeny',
      password: '1234',
      token: crypto.randomUUID(),
      role: "user",
    },
  );

  const [artistOne, artistTwo] = await Artist.create({
    name: "Скриптонит",
    image: "fixtures/scrip.jpeg",
    description: "Скриптони́т — казахстанский исполнитель и музыкальный продюсер, основатель лейбла Musica36.",
    isPublished: false,
  }, {
    name: "Oxxxymiron",
    image: "fixtures/oxxxymiron.webp",
    description: "Oxxxymiron (Оксимиро́н; настоящее имя — Миро́н Я́нович Фёдоров; род. 31 января 1985, Ленинград) — российский рэп-исполнитель, поэт-песенник и общественный ...",
    isPublished: true,
  });

  const [albumOne, albumTwo, albumThree, albumFour] = await Album.create({
    name: "Горгород",
    artist: artistTwo,
    createdAt: 2015,
    image: "fixtures/gorgorod.png",
    isPublished: true,
  }, {
    name: "Красота и Уродство (Beauty & Ugliness) Oxxxymiron",
    artist: artistTwo,
    createdAt: 2021,
    image: "fixtures/oxxxyKrasota.png",
    isPublished: true,
  }, {
    name: "Дом с нормальными явлениями",
    artist: artistOne,
    createdAt: 2015,
    image: "fixtures/homeScrip.jpeg",
    isPublished: false,
  }, {
    name: "Уроборос: Улица 36",
    artist: artistOne,
    createdAt: 2017,
    image: "fixtures/uroboros.jpg",
    isPublished: true,
  },);

  await Track.create({
    name: "Не сначала",
    album: albumOne,
    item: 1,
    duration: "2:05",
    isPublished: true,
  }, {
    name: "Всего лишь писатель",
    album: albumOne,
    item: 2,
    duration: "3:29",
    isPublished: true,
  }, {
    name: "Переплетено",
    album: albumOne,
    item: 3,
    duration: "4:51",
    isPublished: true,
  }, {
    name: "Полигон",
    album: albumOne,
    item: 4,
    duration: "3:40",
    isPublished: true,
  },{
    name: "Колыбельная",
    album: albumOne,
    item: 5,
    duration: "3:18",
    isPublished: true,
  },{
    name: "Хоп-механика",
    album: albumTwo,
    item: 1,
    duration: "2:16",
    isPublished: true,
  },{
    name: "Агент",
    album: albumTwo,
    item: 2,
    duration: "3:34",
    isPublished: true,
  },{
    name: "Красота и уродство",
    album: albumTwo,
    item: 3,
    duration: "2:39",
    isPublished: true,
  },{
    name: "Нон-фикшин",
    album: albumTwo,
    item: 4,
    duration: "3:35",
    isPublished: true,
  },{
    name: "Мы все умрем",
    album: albumTwo,
    item: 5,
    duration: "2:46",
    isPublished: true,
  },{
    name: "Интро",
    album: albumThree,
    item: 1,
    duration: "1:19",
    isPublished: true,
  },{
    name: "Оставь это нам",
    album: albumThree,
    item: 2,
    duration: "1:40",
    isPublished: true,
  },{
    name: "Коньяк",
    album: albumThree,
    item: 3,
    duration: "2:22",
    isPublished: true,
  },{
    name: "Притон",
    album: albumThree,
    item: 4,
    duration: "3:56",
    isPublished: true,
  },{
    name: "Дома",
    album: albumThree,
    item: 5,
    duration: "3:33",
    isPublished: true,
  },{
    name: "Мистер 718",
    album: albumFour,
    item: 1,
    duration: "3:47",
    isPublished: true,
  },{
    name: "Внатуре",
    album: albumFour,
    item: 2,
    duration: "4:12",
    isPublished: true,
  },{
    name: "Животные",
    album: albumFour,
    item: 3,
    duration: "3:03",
    isPublished: true,
  },{
    name: "Пацан",
    album: albumFour,
    item: 4,
    duration: "2:57",
    isPublished: true,
  },{
    name: "Положение",
    album: albumFour,
    item: 5,
    duration: "4:43",
    isPublished: false,
  });

  await db.close();
};

void run();