const path = require("path");
const rp = require("request-promise");
const fs = require("fs");

const admin = require('firebase-admin');

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

//let serviceAccount = require('./serviceAccountKey.json');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || "another-project-213615";

//Helper functions
const metadata_identity_doc_url =
  "http://metadata/computeMetadata/v1/instance/service-accounts/deault/identity";

async function getIDTokenFromComputeEngine(audience) {
  try {
    const options = {
      uri: metadata_identity_doc_url,
      qs: { audience },
      headers: {
        "Metadata-Flavor": "Google"
      }
    };

    const token = rp(options);
    return token;
  } catch (e) {
    // KAD throw e;
     return null;
  }
}

async function makeAuthenticatedRequest(audience, url, options = {}) {
  try {
    const token = ""; //await getIDTokenFromComputeEngine(audience);

    const headers = options.headers || {};
    headers["Authorization"] = `Bearer ${token}`;

    options.headers = headers;
    options.uri = url;

    const response = await rp(options);
    return response;
  } catch (e) {
    throw e;
  }
}
      //admin.initializeApp({
      //  credential: admin.credential.cert(serviceAccount)
      //});
      admin.initializeApp();

//OLD WAY admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)

let db = admin.firestore();
async function dumpTable(collectionName)
{
  try {
    let docRef = db.collection(collectionName);
    let allDocs = docRef.get()
    .then(snapshot => {
       console.log("COLLECTION_NAME: " + collectionName + "\n[");
       resultJson = snapshot.docs.map(doc => {
          var doc = doc.data();
          console.log(JSON.stringify(doc) + ",");
       })
    }).then(() => console.log("]"))
    .catch(err => {
      console.log('Error getting documents', err);
    });

  } catch (e) {
    console.log(`Error: ${e}`);
    console.trace(e.stack);
  }


}

async function run()
{
    var fileText = fs.readFileSync("hobbies.txt", "utf-8");
    var textByLine = fileText.split("\n");
    
    var docRef;
    for(var i = 0; i < textByLine.length; i++) {
        var line = textByLine[i];
     
        if (line.startsWith("COLLECTION_NAME") > 0)
        {
           collectionName = line.replace("COLLECTION_NAME: ","");
           docRef = db.collection(collectionName);
           console.log("HELLO");
        }
        else
        {
           if (line.length > 0)
           {
              console.log(line);
              if (docRef)
	      {
                 let setDoc = docRef.doc(line).set({});
                 console.log("Writing row for collection, " + collectionName + "," + line);
	      }
           }
        }
    }

}
run();
