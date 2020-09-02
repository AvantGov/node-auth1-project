module.exports = {
    development: {
        client: 'squlite3',
        useNullAsDefaul: 'true',
        connection: {
            filename: './data/users.db3'
        },
        migrations: {
            directory: './data/migrations'
          },
          seeds: {
            directory: './data/seeds'
          },
          pool: {
            afterCreate: (connection, done) => {
              connection.run('PRAGMA foreign_keys = ON', done);
            },
        }
    }
}