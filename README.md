# use-x-cache

`use-x-cache` is a custom React hook that provides a flexible and easy-to-use cache management solution for your React applications. It allows you to cache data with optional time-to-live (TTL) and provides automatic cache cleanup when components are unmounted.

## Installation

You can install `use-x-cache` using npm or yarn:

```sh
npm install use-x-cache
# or
yarn add use-x-cache
```

## Usage

```javascript
import React, { useEffect } from 'react';
import useXCache from 'use-x-cache';

function MyComponent() {
  const { get, set, remove, clearAll } = useXCache('myCache', 5); // Cache with 5 minutes TTL

  useEffect(() => {
    // Set a value in the cache
    set({ key: 'exampleKey' }, 'Example Value', 10); // TTL of 10 minutes for this value

    // Retrieve a cached value
    const cachedValue = get({ key: 'exampleKey' });
    console.log('Cached Value:', cachedValue);

    // Delete a cached value
    remove({ key: 'exampleKey' });

    // Clear the entire cache
    clearAll();
  }, []);

  return (
    // Your component content here
  );
}
```

In the example above, we import and use `use-x-cache` to manage a cache named 'myCache'. You can set values, retrieve values, delete specific values, and clear the entire cache. The cache has an optional cache lifetime (TTL) that can be specified globally for the cache or individually for each value.

## API

- `get(key: any): CacheValue | undefined`: Retrieve a cached value by the provided key. Returns `undefined` if the value is not found or has expired.

- `set(key: any, value: CacheValue, ttl?: number): void`: Set a value in the cache using the provided key and value. Optionally, you can specify a TTL in minutes for the specific value. If no TTL is provided, the global cache TTL (set during `useXCache` initialization) is used.

- `remove(key: any): void`: Delete a cached value by the provided key.

- `clearAll(): void`: Clear the entire cache.

## License

This package is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

Feel free to use, modify, and distribute it according to your needs. If you find any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/your-username/use-x-cache).
