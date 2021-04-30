import { Connection, createConnection, getConnectionOptions } from 'typeorm';

const createConnetion = async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database: "./src/database/database.sqlite"
    }),
  );
};

export default createConnetion;