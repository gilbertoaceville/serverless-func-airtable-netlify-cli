require("dotenv").config();

//REMEMBER TO ADD HEADER ORIGIN
const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base("appc3LD2L404emaa2")
  .table("Products");

exports.handler = async (event, context, cb) => {
  //console.log(events) // get the query params as part of it object
  const { id } = event.queryStringParameters;
  if (id) {
    try {
      const product = await airtable.retrieve(id);
      //if there is no id match, we will get back an obj with {error: 'NOT_FOUND'} if we console.log(product)
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product match the id: ${id}`,
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Internal server error`,
      };
    }
  }

  try {
    const { records } = await airtable.list();
    const products = records.map((product) => {
      const { id } = product;
      const { name, image, price } = product.fields;
      const url = image[0].url;
      return { url, id, name, price };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    if (error)
      return {
        statusCode: 500,
        body: "Internal server error",
      };
  }
};
