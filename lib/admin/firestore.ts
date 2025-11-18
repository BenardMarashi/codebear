import { 
  collection, addDoc, getDocs, query, orderBy, 
  deleteDoc, doc, Timestamp, updateDoc, Firestore
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  message: string;
  timestamp: Date | Timestamp;
  read?: boolean;
}

// Helper to ensure we're on client with db initialized
function ensureClientSide(): Firestore {
  if (typeof window === 'undefined') {
    throw new Error('🔥 Firebase functions can only be called on client-side!');
  }
  if (!db) {
    throw new Error('🔥 Firebase not initialized! Make sure you\'re calling this from a client component.');
  }
  return db;
}

export async function addContactSubmission(data: Omit<ContactSubmission, 'id' | 'timestamp' | 'read'>) {
  try {
    console.log('🔵 Attempting to add contact submission:', data);
    
    const firestore = ensureClientSide();

    const submissionData = {
      name: data.name,
      email: data.email,
      company: data.company || '',
      phone: data.phone || '',
      service: data.service,
      message: data.message,
      timestamp: Timestamp.now(),
      read: false
    };

    console.log('🔵 Submission data prepared:', submissionData);

    const docRef = await addDoc(collection(firestore, 'contact_submissions'), submissionData);
    
    console.log('✅ Contact submission added successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error in addContactSubmission:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    console.log('🔵 Fetching contact submissions...');
    
    const firestore = ensureClientSide();

    const q = query(collection(firestore, 'contact_submissions'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    console.log('✅ Found', querySnapshot.docs.length, 'contact submissions');
    
    const submissions = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Document data:', doc.id, data);
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        service: data.service,
        message: data.message,
        timestamp: data.timestamp?.toDate() || new Date(),
        read: data.read || false
      } as ContactSubmission;
    });

    return submissions;
  } catch (error) {
    console.error('❌ Error in getContactSubmissions:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

export async function markContactAsRead(id: string) {
  try {
    console.log('🔵 Marking contact as read:', id);
    const firestore = ensureClientSide();
    await updateDoc(doc(firestore, 'contact_submissions', id), { read: true });
    console.log('✅ Contact marked as read');
  } catch (error) {
    console.error('❌ Error marking contact as read:', error);
    throw error;
  }
}

export async function deleteContactSubmission(id: string) {
  try {
    console.log('🔵 Deleting contact submission:', id);
    const firestore = ensureClientSide();
    await deleteDoc(doc(firestore, 'contact_submissions', id));
    console.log('✅ Contact submission deleted');
  } catch (error) {
    console.error('❌ Error deleting contact submission:', error);
    throw error;
  }
}