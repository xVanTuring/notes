# Sliding Window Rate Limiter


``` js
import Redis from 'ioredis';
const redis = new Redis();

async function is_action_allowed(user_id: string, action_key: string, period: number, max_count: number) {
    const key = `hist:${user_id}:${action_key}`;
    const now_ts = Date.now();
    console.log(now_ts);
    let result = await redis.pipeline()
        .zadd(key, now_ts, String(Math.floor(Math.random() * 10000000000)))
        .zremrangebyscore(key, 0, now_ts - period * 1000)
        .zcard(key)
        .expire(key, period + 1)
        .exec();
    console.log(result);
    return (result?.[2][1] ?? Infinity) <= max_count;
}
(async () => {
    for (let index = 0; index < 10; index++) {
        is_action_allowed("xVan", "Kik", 60, 20).then(result => {
            console.log("Result", result);
        });
    }
    setTimeout(() => {
        redis.disconnect();

    }, 2000);
})();

```