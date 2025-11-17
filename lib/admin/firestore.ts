import { 
  collection, addDoc, getDocs, query, orderBy, 
  deleteDoc, doc, Timestamp, updateDoc
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

export async function addContactSubmission(data: Omit<ContactSubmission, 'id' | 'timestamp' | 'read'>) {
  const docRef = await addDoc(collection(db, 'contact_submissions'), {
    ...data,
    timestamp: Timestamp.now(),
    read: false
  });
  return docRef.id;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const q = query(collection(db, 'contact_submissions'), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp?.toDate() || new Date()
  })) as ContactSubmission[];
}

export async function markContactAsRead(id: string) {
  await updateDoc(doc(db, 'contact_submissions', id), { read: true });
}

export async function deleteContactSubmission(id: string) {
  await deleteDoc(doc(db, 'contact_submissions', id));
}