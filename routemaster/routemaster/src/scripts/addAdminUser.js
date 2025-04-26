import { promises as fs } from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import bcrypt from 'bcryptjs';

// Path to your Firebase service account JSON file
const serviceAccountPath = '../assets/routemaster-7b0d9-firebase-adminsdk-cotky-75a3d90174.json';

async function loadServiceAccount() {
  try {
    const serviceAccount = JSON.parse(await fs.readFile(serviceAccountPath, 'utf8'));
    initializeApp({ credential: cert(serviceAccount) });
    console.log('Firebase Admin initialized.');
  } catch (error) {
    console.error('Error loading service account:', error);
  }
}

async function addAdminUser(email, password) {
  try {
    const db = getFirestore();
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add user to Firestore
    await db.collection('adminUsers').doc(email).set({
      email: email,
      password: hashedPassword
    });

    console.log('Admin user added successfully.');
  } catch (error) {
    console.error('Error adding admin user:', error);
  }
}

// Example usage
(async () => {
  await loadServiceAccount();
  await addAdminUser('admin@example.com', 'securepassword123');
})();
