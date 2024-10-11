import { Client } from 'pg'

export const getOneFromDb = async (
  query: string,
  values: any[],
  client: Client
): Promise<object | null> => {
  const result = await client.query(query, values)

  if (result.rowCount === 0) {
    return null
  }

  return result.rows[0]
}
