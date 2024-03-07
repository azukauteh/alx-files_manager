import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const DB_PORT = process.env.DB_PORT || '27017';
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
    const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}`;
    this._client = new MongoClient(DB_URL, { useUnifiedTopology: true }); // Add useUnifiedTopology option
    this.connected = false;
    this.connect();
  }

  async connect() {
    try {
      await this._client.connect();
      this.connected = true;
      this._db = this._client.db();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); // Exit the process on connection error
    }
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    return this._db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    return this._db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
