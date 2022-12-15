import config from "../../config";

const { backendURL } = config;

// Some util functions to parse the weird ass data from the database
function processData(json, matcher) {
  let res = {};
  Object.keys(json).map((key) => {
    if (matcher(key)) {
      res[key] = JSON.parse(json[key]);
    } else {
      res[key] = json[key];
    }
  });
  return res;
}

export default async function handler(req, res) {
  let { gstin } = req.query;
  let response, data;
  // fetching all the data

  // R1 Data
  let response1 = await fetch(`${backendURL}/api/v1/r1?GSTIN=${gstin}`);
  let response2 = await fetch(`${backendURL}/api/v1/r12?GSTIN=${gstin}`);
  let data1 = await response1.json();
  let data2 = await response2.json();
  let R1Data = { ...data1.data, ...data2.data };

  // R3 Data
  response = await fetch(`${backendURL}/api/v1/r3b?GSTIN=${gstin}`);
  data = await response.json();
  let R3Data = processData(
    data.data,
    (key) =>
      key == "itc_elg" ||
      key === "intr_ltfee" ||
      key == "qn" ||
      key == "sup_details"
  );

  // R9 Data
  response = await fetch(`${backendURL}/api/v1/r9?GSTIN=${gstin}`);
  data = await response.json();
  let R9Data = processData(
    data.data,
    (key) => key.startsWith("table") || key == "tax_pay"
  );

  // TODO: DataSelection

  console.log({ R1Data, R3Data, R9Data });

  res.status(200).json({ success: true, data: { R1Data, R3Data, R9Data } });
}