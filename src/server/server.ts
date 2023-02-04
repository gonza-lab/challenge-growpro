import { createServer } from 'miragejs';
import getRandomInt from '../utils/getRandomInt';
import swap from '../utils/swap';

let mock = [
  {
    image: '/images/e1.jpg',
    type: 0,
    name: 'Gladiator Pro',
    id: 1,
  },
  {
    image: '/images/o0.jpg',
    type: 2,
    name: 'Ginny Classic',
    id: 3,
  },
  {
    image: '/images/n0.jpg',
    type: 1,
    name: 'Sport Rudy',
    id: 2,
  },
  {
    image: '/images/e0.jpg',
    type: 0,
    name: 'E-Prodigy 7',
    id: 4,
  },
  {
    image: '/images/n2.jpg',
    type: 1,
    name: 'Silver Fox R29',
    id: 5,
  },
  {
    image: '/images/o1.jpg',
    type: 2,
    name: 'New Voncile 21',
    id: 6,
  },
  {
    image: '/images/e2.jpg',
    type: 0,
    name: 'Transformer',
    id: 7,
  },
  {
    image: '/images/o2.jpg',
    type: 2,
    name: 'Cherylin Classic',
    id: 9,
  },
  {
    image: '/images/n1.jpg',
    type: 1,
    name: 'Roman',
    id: 8,
  },
];

mock = swap(getRandomInt(8), getRandomInt(8), mock);
mock = swap(getRandomInt(8), getRandomInt(8), mock);

const initServer = function () {
  let server = createServer({
    routes() {
      this.get(
        '/api/bycicles',
        () => {
          return mock;
        }
        // { timing: 1500 }
      );
    },
  });

  return server;
};

export default initServer;
