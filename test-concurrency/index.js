process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require("axios");
const cookie = "express:sess=YOUR_COOKIE_HERE";

const doRequest = async () => {
  const { data } = await axios.post(
    `https://sahafrica.com/api/products`,
    {},
    {
      headers: { cookie },
    }
  );

  await axios.put(
    `https://sahafrica.com/api/products/${data.id}`,
    {},
    {
      headers: { cookie },
    }
  );

  axios.put(
    `https://sahafrica.com/api/products/${data.id}`,
    {},
    {
      headers: { cookie },
    }
  );

  console.log("Request completed");
};

(async () => {
  for (let i = 0; i < 400; i++) {
    doRequest();
  }
})();
