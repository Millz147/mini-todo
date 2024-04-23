import express from "express";
import todosRouter from "./routers";
import pool from "./db";
import { errorHandler } from "./middlewares/errorHandler";

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
    this.errorHandler();
  }

  private config() {
    this.app.use(
      express.urlencoded({
        extended: false,
        // limit: '50mb',
        // parameterLimit: 100000
      })
    );
    this.app.use(express.static("."));
    this.app.use(express.json({ limit: "10000mb" }));
  }

  private dbConnect() {
    pool.connect(function (err, client, done) {
      if (err) {
        return console.log("Db not connected!");
      }

      console.log("Connected");
    });
  }

  private routerConfig() {
    this.app.use("/todos", todosRouter);
  }

  private errorHandler() {
    this.app.use(errorHandler);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: any) => reject(err));
    });
  };
}

export default Server;
