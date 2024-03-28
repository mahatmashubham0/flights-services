const { createLogger, format, transports } = require("winston");
const { combine, label, printf, timestamp } = format;

const myFormat = printf(({ level, message ,timestamp }) => {
        return `${timestamp}  : ${level}: ${message}`
});

const logger = createLogger({
    format: combine(
        // label({label: "right dicision"}),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'comfinex.log'})
    ],
})

module.exports = logger