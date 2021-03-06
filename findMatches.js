// module.exports = async function matchUser(db, doc)
// {
//  try {

//          var user = doc["User"];
//          if ("Interests" in doc)
//          {
//             var interests = doc["Interests"];
//             var match = {}
//             var done = true;
//             var ctr = 0;
//             interests.forEach(async function(interest) {
//                ctr++;
//                console.log("################################################");
//                console.log("Looking for others with this interest: " + interest);
//                var docRef = await db.collection("users").where("Interests", "array-contains", interest).get().then(async function(querySnapshot) {
//                     console.log("FOUND " + querySnapshot.size + " matches for " + interest + " for " + user);
         
//                     if (querySnapshot.size > 1)
//                     {
//                          match[interest] = querySnapshot.size;
//                     }

//                });
//                if (ctr === interests.length)
//                {
//                    return match;
//                }
//             })
//          }
//  } catch (e) {
//    console.log(`Error: ${e}`);
//    console.trace(e.stack);
//  }

// }


const path = require("path");
const rp = require("request-promise");
//const pdf = require("pdf-parse");
const fs = require("fs");

const admin = require('firebase-admin');

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

//let serviceAccount = require('./serviceAccountKey.json');
var counter = 0;

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || "another-project-213615";

//Helper functions
const metadata_identity_doc_url =
  "http://metadata/computeMetadata/v1/instance/service-accounts/default/identity";

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
async function loginToFirestore()
{
   audience = "";
   const token = await getIDTokenFromComputeEngine(audience);
   console.log("token = " + JSON.stringify(token));
   if (true || Object.entries(token).length === 0)
   {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
   }
   else
   {
      admin.initializeApp({
        credential: admin.credential.cert(token)
      });
   }
}
//loginToFirestore();
admin.initializeApp();

const submitSearch = () => {
  const [user] = useAuthState.firebase.auth();
  const userInterests = firestore.collection("users").where('user', '===', user).interests; // userInterests should be an array - is this what it is now?
  for (interestsSearchVal in userInterests) {
    // typeahead.getInstance().clear();
    // props.history.push(`/interests/${interestsSearchVal}`);
    console.log("IN HERE");
    const allUsers = firestore.collection("users");
    console.log(interestsSearchVal);
    var matchesArray = [];

    let docRef = firestore.collection("users").where("interests", 'array-contains', interestsSearchVal);
    let allDocs = docRef.get()
      .then(snapshot => {
        resultJson = snapshot.docs.map(doc => {
            //return { id: doc.id, ...doc.data() }
            matchesArray.push(doc.data().displayName);
            // <div>
            //   <span>{doc.data().displayName}</span>
            // </div>
            return doc.data().displayName
        });
        setUsers(resultJson);
      //console.log(JSON.stringify(resultJson));
      //res.json(resultJson);
      console.log(matchesArray);
    })
  .catch(err => {
    console.log('Error getting interests documents', err);
  });
  }
};
//OLD WAY admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)

let db = admin.firestore();

function run()
{
  try {

    let docRef = db.collection("users");
    let allDocs = docRef.get()
    .then(snapshot => {
       resultJson = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
       })

     //console.log(resultJson);
     resultJson.forEach(async function(doc) {
          var doc_id = doc.id;
console.log("DOC ID - " + doc.id);
          var user = doc["User"];
          var interests = doc["interests"];
          console.log(interests);
          var match = {}
          for (interest in interests)
          {
             console.log("################################################");
             console.log("Looking for others with this interest: " + interests[interest]);
             var docRef = db.collection("users").where("interests", "array-contains", interests[interest]);

                   await docRef.get().then(async function(querySnapshot) {
                   console.log("FOUND " + querySnapshot.size + " matches for " + interests[interest]);
           
                   if (querySnapshot.size > 1)
                   {
                        match[interests[interest]] = querySnapshot.size;
                        let setDoc = await db.collection("users").doc(doc.id).update({"Matches": match}).then(function() {
                                console.log("Document successfully updated!");
                         })
                         .catch(function(error) {
                             // The document probably doesn't exist.
                             console.error("Error updating document: ", error);
                        });
                   }

                   });
          }

    });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  } catch (e) {
    console.log(`Error: ${e}`);
    console.trace(e.stack);
  }

}
run();