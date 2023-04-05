import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    // this.client.connect();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });
    this.client.on('connect', () => {
    });
  }

  isAlive() {
    if (this.client.ping()) {
      return true;
    }
    return false;
  }

  async get(key) {
    const val = this.client.get(key);
    return val;
  }

  async set(key, value, duration) {
    this.client.set(key, value, { EX: duration });
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
