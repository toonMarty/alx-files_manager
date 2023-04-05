import * as redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.connect();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });
    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    });
  }

  isAlive() {
    return this.client.connect;
  }

  async get(key) {
    const val = await this.client.get(key);
    return val;
  }

  async set(key, value, duration) {
    this.client.setEx(key, duration, value);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
