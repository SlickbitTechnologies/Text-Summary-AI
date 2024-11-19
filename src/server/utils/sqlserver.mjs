// const Connection = require("tedious").Connection;
// const Request = require("tedious").Request;
import { Connection, Request } from "tedious";
const config = {
  server: "35.154.163.72",
  port: 1443,
  authentication: {
    type: "default",
    options: {
      userName: "sa", // update me
      password: "KZT&6:g974NQe7}efmD1", // update me
    },
  },
  options: {
    encrypt: true, // This is important for SSL encryption
    trustServerCertificate: true, // Ignore self-signed certificate error
    database: "GoAppetite",
  },
};

export const connection = new Connection(config);

connection.on("connect", (err) => {
  if (err) {
    console.log("eeeeee", err);
  } else {
    // executeStatement()
  }
});
connection.connect();

export const executeStatement = (query, callback) => {
  let data = [];
  let error = false;
  const request = new Request(query, (err) => {
    if (err) {
      //   callback(false, err);
      error = true;
      console.log("error", err);
    }
    //   connection.close()
  });
  request.on("error", (err) => {
    callback(false, err);
    return;
  });
  request.on("row", async (columns) => {
    const userData = {};

    columns.forEach((column) => {
      userData[column.metadata.colName] = column.value;
    });
    data.push(userData);
  });
  request.on("requestCompleted", () => {
    console.log("data", data);
    if (error) {
      callback(false, data);
    } else {
      callback(true, data);
    }

    // Send the accumulated array as response
  });
  connection.execSql(request);
};
