/* eslint-disable no-unused-expressions */
import { sql } from './sql.js'

sql`
  CREATE TABLE videos (
    id  TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    duration INTEGER
    );
`.then(() => console.log('table created'))
