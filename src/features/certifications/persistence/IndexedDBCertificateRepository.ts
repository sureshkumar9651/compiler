import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Certificate, AssessmentAttempt } from '../types';

interface JSCodeLabCertDB extends DBSchema {
  projects: {
    key: string;
    value: any;
    indexes: { 'updatedAt': number };
  };
  certificates: {
    key: string;
    value: Certificate;
    indexes: {
      'issuedAt': number;
      'certificationId': string;
    };
  };
  assessment_attempts: {
    key: string;
    value: AssessmentAttempt;
    indexes: {
      'timestamp': number;
      'certificationId': string;
    };
  };
}

const DB_NAME = 'js-codelab';
const DB_VERSION = 2;

export class IndexedDBCertificateRepository {
  private dbPromise: Promise<IDBPDatabase<JSCodeLabCertDB>>;

  constructor() {
    this.dbPromise = typeof window !== 'undefined'
      ? openDB<JSCodeLabCertDB>(DB_NAME, DB_VERSION, {
          upgrade(db) {
            if (!db.objectStoreNames.contains('projects')) {
              const store = db.createObjectStore('projects', { keyPath: 'id' });
              store.createIndex('updatedAt', 'updatedAt');
            }
            if (!db.objectStoreNames.contains('certificates')) {
              const certStore = db.createObjectStore('certificates', { keyPath: 'id' });
              certStore.createIndex('issuedAt', 'issuedAt');
              certStore.createIndex('certificationId', 'certificationId');
            }
            if (!db.objectStoreNames.contains('assessment_attempts')) {
              const attemptStore = db.createObjectStore('assessment_attempts', { keyPath: 'id' });
              attemptStore.createIndex('timestamp', 'timestamp');
              attemptStore.createIndex('certificationId', 'certificationId');
            }
          },
        })
      : Promise.resolve(null as unknown as IDBPDatabase<JSCodeLabCertDB>);
  }

  async saveCertificate(certificate: Certificate): Promise<Certificate> {
    const db = await this.dbPromise;
    if (!db) return certificate;

    await db.put('certificates', certificate);
    return certificate;
  }

  async getCertificate(id: string): Promise<Certificate | null> {
    const db = await this.dbPromise;
    if (!db) return null;

    const cert = await db.get('certificates', id);
    return cert || null;
  }

  async getCertificates(): Promise<Certificate[]> {
    const db = await this.dbPromise;
    if (!db) return [];

    const tx = db.transaction('certificates', 'readonly');
    const store = tx.objectStore('certificates');
    const index = store.index('issuedAt');
    const certificates: Certificate[] = [];

    let cursor = await index.openCursor(null, 'prev');
    while (cursor) {
      certificates.push(cursor.value);
      cursor = await cursor.continue();
    }

    return certificates;
  }

  async getCertificatesByCertificationId(
    certificationId: 'javascript-fundamentals' | 'react-js'
  ): Promise<Certificate[]> {
    const db = await this.dbPromise;
    if (!db) return [];

    const tx = db.transaction('certificates', 'readonly');
    const store = tx.objectStore('certificates');
    const index = store.index('certificationId');
    return index.getAll(certificationId);
  }

  async deleteCertificate(id: string): Promise<void> {
    const db = await this.dbPromise;
    if (!db) return;

    await db.delete('certificates', id);
  }

  async saveAttempt(attempt: AssessmentAttempt): Promise<AssessmentAttempt> {
    const db = await this.dbPromise;
    if (!db) return attempt;

    await db.put('assessment_attempts', attempt);
    return attempt;
  }

  async getAttempts(certificationId?: string): Promise<AssessmentAttempt[]> {
    const db = await this.dbPromise;
    if (!db) return [];

    const tx = db.transaction('assessment_attempts', 'readonly');
    const store = tx.objectStore('assessment_attempts');

    if (certificationId) {
      const index = store.index('certificationId');
      return index.getAll(certificationId);
    }

    const index = store.index('timestamp');
    const attempts: AssessmentAttempt[] = [];
    let cursor = await index.openCursor(null, 'prev');
    while (cursor) {
      attempts.push(cursor.value);
      cursor = await cursor.continue();
    }

    return attempts;
  }
}

export const certificateRepository = new IndexedDBCertificateRepository();
