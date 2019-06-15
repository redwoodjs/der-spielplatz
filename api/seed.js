import Photon from './generated/photon';

const photon = new Photon({ debug: false });

const findOrCreateUser = async data => {
  const { username } = data;
  let user;
  try {
    user = await photon.users.findOne({
      where: {
        username,
      },
    });
  } catch (e) {
    user = await photon.users.create({ data });
  }
  return user;
};

const main = async () => {
  await photon.connect();

  // https://github.com/prisma/next/blob/bdf391bd783605063eac2a36689809ed3cb83a72/docs/photon/api.md

  try {
    const mojombo = await findOrCreateUser({
      username: 'mojombo',
      name: 'tom preston-werner',
    });

    const peterp = await findOrCreateUser({
      username: 'peterp',
      name: 'peter pistorius',
    });

    console.log(mojombo);
    console.log(peterp);
  } catch (e) {
    console.log('could not create users', e);
  }
};

main()
  .then(() => {
    console.log('running...');
    photon.disconnect();
  })
  .catch(e => {
    photon.disconnect();
    console.log('oh no', e);
  });
