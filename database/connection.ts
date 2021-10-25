import { Connection, createConnection } from "typeorm";
import { Book } from "../models/books";
import { Reader } from "../models/readers";
import { User } from "../models/users";

export class DatabaseConnection {

    public static connection: Connection = null;
    
    static async connect() {
        if (!this.connection) {
          try {
            this.connection = await createConnection({
              type: "mssql",
              host: process.env.host,
              port: parseInt(process.env.db_port),
              username: process.env.database_username,
              password: process.env.database_password,
              database: process.env.database,
              synchronize: true,
              logging: false,
              dropSchema: true,
              entities: [Reader, Book, User],
              options: {
                enableArithAbort: true,
              },
            });
            console.log("Connection to DB success");
          } catch (error) {
            console.log("Error db connection", error);
          }
        }
        return this.connection;
      }
    }
    