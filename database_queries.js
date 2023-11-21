import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import 'dotenv/config'
const password = process.env.MONGO_PASSWORD;
const username = process.env.MONGO_USERNAME;
const uri = `mongodb+srv://${username}:${password}@cluster0.vvmtyfv.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function getName(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.name : null;
}

export async function getHostId(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.host_id : null;
}

export async function getHostName(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.host_name : null;
}

export async function getNeighbourhood(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.neighbourhood : null;
}

export async function getLatitude(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.latitude : null;
}

export async function getLongitude(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.longitude : null;
}

export async function getRoomType(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.room_type : null;
}

export async function getPrice(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.price : null;
}

export async function getMinimumNights(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.minimum_nights : null;
}

export async function getNumberOfReviews(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.number_of_reviews : null;
}

export async function getLastReview(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.last_review : null;
}

export async function getReviewsPerMonth(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.reviews_per_month : null;
}

export async function getCalculatedHostListingsCount(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.calculated_host_listings_count : null;
}

export async function getAvailability365(id) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const objectId = new ObjectId(id);
  const result = await collection.findOne({ _id: objectId });
  return result ? result.availability_365 : null;
}

export async function getIds(skip, limit) {
  const collection = client.db("airbnb").collection("airbnb_listing");
  const result = await collection.find({}).skip(skip).limit(limit).toArray();
  return result.map((item) => item._id);
}
