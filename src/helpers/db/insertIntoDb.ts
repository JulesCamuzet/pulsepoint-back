import { Client } from 'pg'

export const insertIntoDb = async (
  query: string,
  values: any[],
  client: Client
) => {
  const result = await client.query(query, values)

  return result
}
