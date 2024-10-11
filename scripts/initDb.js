;(async () => {
  const { Client } = require('pg')
  const chalk = (await import('chalk')).default
  const { configDotenv } = require('dotenv')

  configDotenv()

  const client = new Client({
    user: process.env.DB_USER ?? 'root',
    host: process.env.DB_HOST ?? 'localhost',
    database: process.env.DB_NAME ?? 'database',
    password: process.env.DB_PASSWORD ?? 'password',
    port: Number(process.env.DB_PASSWORD) ?? 5432,
  })

  const createTables = async () => {
    try {
      await client.connect()
      console.log(chalk.blue('Connected to the database'))

      await client.query(`
          DROP TABLE IF EXISTS Image CASCADE;
          DROP TABLE IF EXISTS Pulsepoint_User CASCADE;
          DROP TABLE IF EXISTS Survey_Title CASCADE;
          DROP TABLE IF EXISTS Survey_Title_Image CASCADE;
          DROP TABLE IF EXISTS Survey CASCADE;
          DROP TABLE IF EXISTS Answer CASCADE;
          DROP TABLE IF EXISTS Vote CASCADE;
          DROP TABLE IF EXISTS Survey_Like CASCADE;
          DROP TABLE IF EXISTS Comment CASCADE;
          DROP TABLE IF EXISTS Comment_Like CASCADE;
        `)

      const queries = [
        {
          name: 'Image',
          query: `CREATE TABLE IF NOT EXISTS Image (
          id varchar PRIMARY KEY,
          file varchar,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`,
        },
        {
          name: 'Pulsepoint_User',
          query: `CREATE TABLE IF NOT EXISTS Pulsepoint_User (
          id varchar PRIMARY KEY,
          username varchar,
          email varchar,
          profile_picture varchar DEFAULT NULL,
          password varchar,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (profile_picture) REFERENCES Image(id)
        );`,
        },
        {
          name: 'Survey_Title',
          query: `CREATE TABLE IF NOT EXISTS Survey_Title (
          id varchar PRIMARY KEY,
          type varchar,
          content varchar,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`,
        },
        {
          name: 'Survey_Title_Image',
          query: `CREATE TABLE IF NOT EXISTS Survey_Title_Image (
          id varchar PRIMARY KEY,
          image varchar,
          survey_title varchar,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (survey_title) REFERENCES Survey_Title(id),
          FOREIGN KEY (image) REFERENCES Image(id)
        );`,
        },
        {
          name: 'Survey',
          query: `CREATE TABLE IF NOT EXISTS Survey (
          id varchar PRIMARY KEY,
          post_date DATE,
          comments_count INT,
          likes_count INT,
          pulsepoint_user varchar,
          title varchar,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (pulsepoint_user) REFERENCES Pulsepoint_User(id),
          FOREIGN KEY (title) REFERENCES Survey_Title(id)
        );`,
        },
        {
          name: 'Answer',
          query: `CREATE TABLE IF NOT EXISTS Answer (
          id varchar PRIMARY KEY,
          type varchar,
          content varchar,
          total_votes INT,
          survey varchar,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (survey) REFERENCES Survey(id)
        );`,
        },
        {
          name: 'Vote',
          query: `CREATE TABLE IF NOT EXISTS Vote (
          id varchar PRIMARY KEY,
          pulsepoint_user varchar,
          answer varchar,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (pulsepoint_user) REFERENCES Pulsepoint_User(id),
          FOREIGN KEY (answer) REFERENCES Answer(id)
        );`,
        },
        {
          name: 'Survey_Like',
          query: `CREATE TABLE IF NOT EXISTS Survey_Like (
          id varchar PRIMARY KEY,
          pulsepoint_user varchar,
          survey varchar,
          like_date DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (pulsepoint_user) REFERENCES Pulsepoint_User(id),
          FOREIGN KEY (survey) REFERENCES Survey(id)
        );`,
        },
        {
          name: 'Comment',
          query: `CREATE TABLE IF NOT EXISTS Comment (
          id varchar PRIMARY KEY,
          pulsepoint_user varchar,
          survey varchar,
          comment varchar,
          content varchar,
          file varchar,
          likes_count INT,
          comments_count INT,
          post_date DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (pulsepoint_user) REFERENCES Pulsepoint_User(id),
          FOREIGN KEY (survey) REFERENCES Survey(id)
        );`,
        },
        {
          name: 'Comment_Like',
          query: `CREATE TABLE IF NOT EXISTS Comment_Like (
          id varchar PRIMARY KEY,
          pulsepoint_user varchar,
          comment varchar,
          like_date DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (pulsepoint_user) REFERENCES Pulsepoint_User(id),
          FOREIGN KEY (comment) REFERENCES Comment(id)
        );`,
        },
      ]

      for (const { name, query } of queries) {
        try {
          await client.query(query)
          console.log(chalk.green(`Table ${name} created successfully.`))
        } catch (err) {
          console.error(chalk.red(`Error creating table ${name}:`, err.message))
        }
      }

      console.log(chalk.yellow('All table creation attempts finished.'))
    } catch (err) {
      console.error(chalk.red('Database connection error:', err.stack))
    } finally {
      await client.end()
      console.log(chalk.blue('Disconnected from the database'))
    }
  }

  createTables()
})()
