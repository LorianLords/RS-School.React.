import { rest } from 'msw';

export const handlers = [
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    const param = req.url.searchParams.get('name');
    if (!param) {
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            {
              id: 1,
              name: 'Rick Sanchez',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              origin: {
                name: 'Earth (C-137)',
                url: 'https://rickandmortyapi.com/api/location/1',
              },
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
              url: 'https://rickandmortyapi.com/api/character/1',
              created: '2017-11-04T18:48:46.250Z',
            },
            {
              id: 2,
              name: 'Morty Smith',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              origin: {
                name: 'unknown',
                url: '',
              },
              image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
              url: 'https://rickandmortyapi.com/api/character/2',
              created: '2017-11-04T18:50:21.651Z',
            },
          ],
        })
      );
    }
    if (param === 'morty') {
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            {
              id: 2,
              name: 'Morty Smith',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              origin: {
                name: 'unknown',
                url: '',
              },
              image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
              url: 'https://rickandmortyapi.com/api/character/2',
              created: '2017-11-04T18:50:21.651Z',
            },
          ],
        })
      );
    }
  }),
  rest.get('https://rickandmortyapi.com/api/character/1', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3',
        },
        origin: {
          name: 'Earth (C-137)',
          url: 'https://rickandmortyapi.com/api/location/1',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z',
      })
    );
  }),
];
