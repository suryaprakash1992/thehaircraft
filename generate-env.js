const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "src/assets");

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const envConfig = `
window.__env = {
  apiKey: "${process.env.NG_FIREBASE_API_KEY || ''}",
  authDomain: "${process.env.NG_FIREBASE_AUTH_DOMAIN || ''}",
  projectId: "${process.env.NG_FIREBASE_PROJECT_ID || ''}",
  storageBucket: "${process.env.NG_FIREBASE_STORAGE_BUCKET || ''}",
  messagingSenderId: "${process.env.NG_FIREBASE_MESSAGING_SENDER_ID || ''}",
  appId: "${process.env.NG_FIREBASE_APP_ID || ''}"
  measurementId: "${process.env.NG_FIREBASE_MEASUREMENT_ID || ''}",
};
`;

fs.writeFileSync(path.join(dirPath, "env.js"), envConfig);

console.log("env.js generated");