import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { existsSync } from "fs";
import { promises as fsPromises } from "fs";
import { join } from "path";

export const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!existsSync(join(__dirname, "./server", "logs"))) {
      await fsPromises.mkdir(join(__dirname, "./server", "logs"));
    }
    await fsPromises.appendFile(
      join(__dirname, "./server", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

export const logger = (req, res, next) => {
  logEvents(`${req?.method}\t${req?.url}\t${req?.headers.origin}`, "reqLog.log");
  console.log(`${req?.method} ${req?.path}`);
  next();
};

//  default { logEvents, logger }
