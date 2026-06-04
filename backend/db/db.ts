import { Pool } from "pg";

export const db = new Pool({
  connectionString:
    "postgresql://lsanadii:moxnbfodysvfrggjhtpm@alpha.mkdb.sh:5432/okcntlic",
});
