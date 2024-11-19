import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

// import firebaseConfig from '../config/firebase.json'
const firebaseConfig = {
  type: "service_account",
  project_id: "inspired-bebop-410611",
  private_key_id: "9961e3379e0aaf8cb3f2391d84502d418b5c6d4c",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDwhBoZ9TOySUa8\nX7AUl8YcDU7rqhZ1lo7GP16ce93eCLzcb3eKh1OJ9X34AfhSIOQaWrgDXlJZvCiB\nyAnS4WEWffuvwKoIe/LfgyLkvMZPyW/x6nDVHjRXeb5/UNRNYpPXAM5b7zii5aHS\nvixVcSzCx4VAcUXr5/jPr9RCOrdzb95ndsQEgJu4J8aPpAQJ9Xne162+iuW2A54G\n5AQCfzia+RADZWinbE1FaKG7IGZ1aUs+m8MWHorX6qoE8vOmpEP1DxzQ6ZVPeSAS\n10fg8qqru2gfhgNWmeQ/dd/RtbN87Ik9tS1WvEGNZY+vTxlQERARGAAoIj7aOnJB\nYtmQbRXHAgMBAAECggEABLcaSeWoPfe4zCBLc+6RIuNR55szNdqd8Z4JbU5HsxQp\nxl/luztcSb6chHG0HBa//Lzy5uyroaMSNOUmktH5/3ZjKkwVKUsWH7KoSvgLzUGj\nkQhpw4vZi9jRAW76Eor7CgKJM9KJ94uX82k+C5jHP17+VPKY49SYPf4c+QVsq6B9\nQ+Pb567OR+FrRU3LDsJcFITGRXfnra41RbFs7FCBf55nk+64AturKRpJNNwr7IKl\n6LPiWpOF6eTgFB1MucKFOGf4lMgb1kcAMwNq59lEY11CDLQPjr1f5XqqkDeVUptr\nn+1W0m6AP+wpQDBVfPo8lyMgl11gIdkw4Mk8pAvLvQKBgQD7x/yMUZ6BjkzMvU57\n2iCGe8Vb/z+EFM067r8xAqiFkIhD7CRmJmx2h2j0iKcgAoOnTfkUe6+EV4T1J4Qw\nmzyVlzLEeINqsgi35GAGpo7BnGAQwMI45JyRUN+wq+Y6ZNmMfPUtfz37aE+4ARXJ\nJ63QatxaTp69F+vOqwuQSeRWdQKBgQD0i8snJyKqajSsb5gbuCI5cmBM2bnePfn9\nw2yYvPBXB6uivwcbOn8OAzb4+1bysgLQIuMYHN2knv2a5f3JghuKDUKYSWJsbDDa\nA/g3pPQNVH/0Ho1HHUoj1swa+wJn9DpCYxxeEK3sqirUH761FMANIcohfAG7GQPg\nQ0PXSF+LywKBgQDrloL+oNhZjVbbND8dsEpCy8ktfbZm1jf6bq7DIyOgZk66j1i3\npDhU5/sS5FLMps2dXF42Bk2C3YlxApq0CG0145YDNGhzC0cRGkWns21cR/+zbUnO\nhkrhxfSokRAJj5fn1nxrJ+ZNOZtuJsXFxLTkkTjB31K0yI9Cf9WAG0PmiQKBgFSj\nydWsUvA+wCpqmXAGpDnT34bZ2N4V/1+Ycw7OXjURH5O9oF0JOw6DiFRW0bpAaH7X\nhFhFLWWb7dTeA5/qG1QF0OXaiGlUbPgYZaIEwr+WXo8EwAs8FPwgjRZNiICoZD20\nBg58oWYHY7l1n1EXdH1XE5nRTNwQBWpqfaGWmBNPAoGADv+ws5ss8hJ2Xp//Eba+\n3IDuklnNWiiBRz8liBrQ+vo3LlwpQidXYWwZ4j3fPfujuWwgo1xvqnoR55Fs4EIu\n62GoahtossvLKAzFNMhkjVGreAJxCV+hJIgzhGUoxkTyYx1Xn/tQH/iEvGXgklHp\nAgV0FpfmVVDLYAVVo3zLrX4=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-az8ht@inspired-bebop-410611.iam.gserviceaccount.com",
  client_id: "104161727486941459791",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-az8ht%40inspired-bebop-410611.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
initializeApp({
  credential: cert(firebaseConfig),
  storageBucket: "gs://inspired-bebop-410611.appspot.com",
});
const FirebaseBD = getFirestore();
const bucket = getStorage().bucket();
const restRef = FirebaseBD.collection("restaurants");
const reviewRef = FirebaseBD.collection("reviews");
const inventoryCollection = FirebaseBD.collection("inventory");
const audioRef = FirebaseBD.collection("audio");

export const addRestaurants = async (restaurant) => {
  try {
    await restRef.doc(restaurant.place_id).set(restaurant);
    console.log("Document added with ID: ", restRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
export const addReviews = async (review) => {
  try {
    await reviewRef.doc(review.id).set(review);
    console.log("Document added with ID: ", reviewRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return error;
  }
};
export const getAllRestaurants = async (city) => {
  try {
    // const querySnapshot = await FirebaseBD.getDocs(restRef);
    const snapshot = await restRef.where("city", "==", city).get();
    let list = [];
    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      list.push({ id: doc.id, ...doc.data() });
    });
    return list;
  } catch (e) {}
};
export const getReviewsById = async (id) => {
  try {
    // const querySnapshot = await FirebaseBD.getDocs(restRef);
    const snapshot = await reviewRef.where("id", "==", id).get();
    let list = [];
    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      list.push({ id: doc.id, ...doc.data() });
    });
    return list;
  } catch (e) {}
};

export async function postInventoryItems(data) {
  try {
    const itemRef = await inventoryCollection
      .where("name", "==", data.name)
      .get();
    // Query by name
    console.log("🚀 ~ postInventoryItems ~ itemRef:", itemRef, data);

    // Check if a document exists with "data.name"
    if (itemRef.empty) {
      console.log("Item not found, creating new item");
      await inventoryCollection.add(data);
      console.log("creatied new inventory item ", data);
      return true;
    }
    const itemDoc = itemRef.docs[0]; // Get the first document (should be the only one)
    console.log("🚀 ~ postInventoryItems ~ itemDoc:", itemDoc.data().quantity);

    const newQuantity = itemDoc.data().quantity + data.quantity;
    const newPrice =
      (itemDoc.data().quantity * itemDoc.data().price +
        data.quantity * data.price) /
      (itemDoc.data().quantity + data.quantity);
    const newHistory = [...itemDoc.data().history, data.history[0]];
    const newTotalPrice = newQuantity * newPrice;

    if (itemDoc.id) {
      await inventoryCollection.doc(itemDoc.id).set({
        ...itemDoc.data(),
        quantity: newQuantity,
        totalPrice: newTotalPrice,
        history: newHistory,
        price: newPrice,
      });
    }

    console.log("Inventory stock updated successfully!");
  } catch (error) {
    console.error("Error updating inventory stock:", error);
  }
}

export async function updateItemUtilisation(data) {
  try {
    const itemRef = await inventoryCollection
      .where("name", "==", data.name)
      .get();
    // Query by name
    console.log("🚀 ~ postInventoryItems ~ itemRef:", itemRef, data);

    if (itemRef.empty) {
      const itemDoc = itemRef.docs[0]; // Get the first document (should be the only one)
      const newQuantity = itemDoc.data().quantity - data.quantity;
      const newHistory = [...itemDoc.data().history, data.history[0]];

      if (itemDoc.id) {
        await inventoryCollection.doc(itemDoc.id).set({
          ...itemDoc.data(),
          quantity: newQuantity,
          history: newHistory,
        });
      }
      return true;
    }

    console.log("Inventory stock updated successfully!");
  } catch (error) {
    console.error("Error updating inventory stock:", error);
  }
}

export const getInventoryItems = async () => {
  try {
    const snapshot = await inventoryCollection.get();
    const items = [];
    snapshot.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function deleteInventoryItem(id) {
  try {
    await inventoryCollection.doc(id).delete();
    return { message: "Item deleted successfully" };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const postAudioData = async (data, audioLink, transcription, summarizeText, audioLength, metricsData) => {
  try {
    await audioRef.add({audioLink: audioLink, ...data.file, transcription: transcription, summarizeText: summarizeText, created_DTM: Date.now(), call_id: audioLength + 1, metricsData: metricsData, domain: data.body.domain});
    console.log("audio added: ", data.file);
    return true;
  } catch (error) {
    console.error("Error adding audio: ", error);
    throw error;
  }
};

export const getAudio = async() => {
  const snapshot = await audioRef.orderBy('created_DTM', 'desc').get()
  let list = [];
  snapshot.forEach((doc) => {
    list.push({ id: doc.id, ...doc.data() });
  });
  return list;
}  

export default FirebaseBD;
export { bucket };
