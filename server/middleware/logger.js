import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { existsSync } from "fs";
import { promises as fsPromises } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const logsPath = join(__dirname, "..", "logs");
    if (!existsSync(logsPath)) {
      await fsPromises.mkdir(logsPath);
    }
    await fsPromises.appendFile(join(logsPath, logFileName), logItem);
  } catch (err) {
    console.log(err);
  }
};

export const logger = (req, res, next) => {
  logEvents(`${req?.method}\t${req?.url}\t${req?.headers.origin}`, "reqLog.log");
  console.log(`${req?.method} ${req?.path}`);
  next();
};
