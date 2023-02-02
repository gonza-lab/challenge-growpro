import { createServer, Factory, Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import Bycicle from '../interfaces/Bycicle';

const BycicleModel: ModelDefinition<Bycicle> = Model.extend({});

const images: { [name: string]: string } = {
  electric: 'e',
  normal: 'n',
  old: 'o',
};

const names: { [name: string]: string[] } = {
  electric: ['Gladiator', 'Prodigy', 'Transformer'],
  normal: ['Rudy ', 'Neal', 'Roman'],
  old: ['Voncile', 'Ginny', 'Cherilyn'],
};
const bycicleTypes = ['electric', 'normal', 'old'];

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const initServer = function () {
  let server = createServer({
    models: {
      bycicle: BycicleModel,
    },

    factories: {
      bycicle: Factory.extend({
        name: (i) => names[bycicleTypes[i % 3]][getRandomInt(2)],
        type: (i) => i % 3,
        image: (i) =>
          '/images/' + images[bycicleTypes[i % 3]] + getRandomInt(2) + '.jpg',
      }),
    },

    seeds(server) {
      server.createList('bycicle', 9);
    },

    routes() {
      this.get(
        '/api/bycicles',
        (schema) => {
          return schema.all('bycicle').models;
        },
        { timing: 1500 }
      );
    },
  });

  return server;
};

export default initServer;
