;(async () => {
  const { Client } = require('pg')
  const { configDotenv } = require('dotenv')
  const chalk = (await import('chalk')).default

  configDotenv()

  const client = new Client({
    user: process.env.DB_USER ?? 'root',
    host: process.env.DB_HOST ?? 'localhost',
    database: process.env.DB_NAME ?? 'database',
    password: process.env.DB_PASSWORD ?? 'password',
    port: Number(process.env.DB_PASSWORD) ?? 5432,
  })

  const insertData = async () => {
    try {
      await client.connect()
      console.log(chalk.blue('Connected to the database'))

      const inserts = [
        // Inserting into User table (table names are now quoted)
        {
          name: 'User',
          query: `INSERT INTO Pulsepoint_User (id, username, email, password) VALUES
            ('1', 'john_doe', 'john@example.com', '$2b$10$4vG2kohcpe7rgc.IABayFe4VwDPnBAuPxOJPKwQP7VMzxiCncYlp6'),
            ('2', 'jane_smith', 'jane@example.com', '$2b$10$4vG2kohcpe7rgc.IABayFe4VwDPnBAuPxOJPKwQP7VMzxiCncYlp6');`,
        },

        // Inserting into Survey_Title table
        {
          name: 'Survey_Title',
          query: `INSERT INTO Survey_Title (id, type, content) VALUES
            ('1', 'Poll', 'Which is your favorite programming language?'),
            ('2', 'Poll', 'Which frontend framework do you prefer?');`,
        },

        // Inserting into Survey table (column names are quoted to avoid conflicts with reserved keywords)
        {
          name: 'Survey',
          query: `INSERT INTO Survey (id, post_date, comments_count, likes_count, pulsepoint_user, title) VALUES
            ('1', '2024-10-01', 5, 10, '1', '1'),
            ('2', '2024-10-02', 3, 8, '2', '2');`,
        },

        // Inserting into Answer table
        {
          name: 'Answer',
          query: `INSERT INTO Answer (id, type, content, total_votes, survey) VALUES
            ('1', 'Single Choice', 'JavaScript', 1, '1'),
            ('2', 'Single Choice', 'Python', 1, '1'),
            ('3', 'Single Choice', 'React', 1, '2'),
            ('4', 'Single Choice', 'Vue', 1, '2');`,
        },

        // Inserting into Vote table
        {
          name: 'Vote',
          query: `INSERT INTO Vote (id, pulsepoint_user, answer) VALUES
            ('1', '1', '1'),
            ('2', '2', '2'),
            ('3', '1', '3'),
            ('4', '2', '4');`,
        },

        // Inserting into Comment table (columns are quoted to avoid conflicts)
        {
          name: 'Comment',
          query: `INSERT INTO Comment (id, pulsepoint_user, survey, comment, content, file, likes_count, comments_count, post_date) VALUES
            ('1', '1', '1', 'Great poll!', 'I love JavaScript!', 'comment1.jpg', 5, 0, '2024-10-03'),
            ('2', '2', '2', 'React is awesome!', 'Definitely React for me.', 'comment2.jpg', 3, 0, '2024-10-04');`,
        },

        // Inserting into Survey_Like table
        {
          name: 'Survey_Like',
          query: `INSERT INTO Survey_Like (id, pulsepoint_user, survey, like_date) VALUES
            ('1', '1', '1', '2024-10-01'),
            ('2', '2', '2', '2024-10-02');`,
        },

        // Inserting into Comment_Like table
        {
          name: 'Comment_Like',
          query: `INSERT INTO Comment_Like (id, pulsepoint_user, comment, like_date) VALUES
            ('1', '1', '1', '2024-10-03'),
            ('2', '2', '2', '2024-10-04');`,
        },
      ]

      for (const { name, query } of inserts) {
        try {
          await client.query(query)
          console.log(
            chalk.green(`Data inserted into ${name} table successfully.`)
          )
        } catch (err) {
          console.error(
            chalk.red(`Error inserting data into ${name} table:`, err.message)
          )
        }
      }

      console.log(chalk.yellow('All data insertion attempts finished.'))
    } catch (err) {
      console.error(chalk.red('Database connection error:', err.stack))
    } finally {
      await client.end()
      console.log(chalk.blue('Disconnected from the database'))
    }
  }

  insertData()
})()
