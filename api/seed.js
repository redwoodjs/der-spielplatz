import Photon from './generated/photon';

const photon = new Photon({ debug: false });

const findOrCreateUser = async data => {
  const { username } = data;
  return photon.users.upsert({ where: { username }, update: data, create: data });
};

const main = async () => {
  await photon.connect();

  // https://github.com/prisma/next/blob/bdf391bd783605063eac2a36689809ed3cb83a72/docs/photon/api.md

  const mojombo = await findOrCreateUser({
    username: 'mojombo',
    name: 'tom preston-werner',
  });

  const peterp = await findOrCreateUser({
    username: 'peterp',
    name: 'peter pistorius',
  });

  // Create some documents
  const doc1 = await photon.documents.create({
    data: {
      name: 'Roadmap Q3',
      path: '://hammer/roadmap-q3',
      user: {
        connect: {
          id: mojombo.id,
        },
      },
    },
  });
  const doc2 = await photon.documents.create({
    data: {
      name: 'CLI ideas',
      path: '://hammer/cli-ideas',
      user: {
        connect: {
          id: peterp.id,
        },
      },
    },
  });

  photon.disconnect();
};

main().catch(e => {
  console.log('oh no', e);
  photon.disconnect();
});
