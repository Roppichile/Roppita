import admin from "firebase-admin"

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK || "{}")
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    })
  } catch (error: any) {
    console.error("Firebase Admin initialization error", error.stack)
  }
}

const db = admin.firestore()
const auth = admin.auth()

export { db, auth }
