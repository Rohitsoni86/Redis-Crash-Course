# Redis-Crash-Course

Learning Redis

# Step 1

Install and Run the Redis Stack on docker

Make sure docker is running first

```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```


Command Explained

==> ON our OS 2 applications will run on the docker container

==> redis server on 6379 port and its UI on 8001 port

==> See the IMAGE IN public/architecture

==> UI is on [http://localhost:8001](http://localhost:8001)



SO the basic is when we start the docker and run this above command the docker will pull the redis server iamge and start a container and in it it setups the 2 things 
1st is the redis server that is normal cli server
2nd is the UI GUI interface for the Redis to see the visuals of the Redis

Your OS
 -------> servers ports exposed 
 ----> Redis Server ---> 6379
 ----> Redis UI ------> 8001

 docker Container running on your OS
 -----------> Redis Server ------> 6379
 -----------> Redis UI --------> 8001
 

Check container

```bash
docker ps
```

Check if it is running

```bash
docker logs redis-stack
```

Access the Redis CLI

```bash
docker exec -it redis-stack redis-cli
```

# Step 2

Basic Redis commands

```bash
# Set a value
set mykey "hello"

# Get a value
get mykey

# Delete a key
del mykey
```

Data Types in Redis

## Strings

Strings are the most basic data type in Redis.

```bash
# Set a string
set mykey "hello"

# Get a string
get mykey

# Delete a string
del mykey
```

## Lists

Lists are ordered collections of strings.

```bash
# Push a value to the list
lpush mylist "hello"

# Push multiple values to the list
# lpush mylist "hello" "world"

# Get the list
lrange mylist 0 -1

# Pop a value from the list
# lpop mylist

# Delete the list
del mylist
```

## Hashes

Hashes are maps of strings to strings.

```bash
# Set a hash
hset myhash field1 value1 field2 value2

# Get a hash
hget myhash field1

# Get all hashes
hgetall myhash

# Delete a hash
del myhash
```

## Sets

Sets are unordered collections of unique strings.

```bash
# Add members to the set
sadd myset member1 member2 member3

# Get the set
smembers myset

# Delete the set
del myset
```

## Sorted Sets

Sorted sets are ordered collections of strings with scores.

```bash
# Add members to the sorted set
zadd myset 1 "hello" 2 "world" 3 "goodbye"

# Get the sorted set
zrange myset 0 -1

# Delete the sorted set
del myset
```

# Step 3 Add the backend node server with redis client

npm init -y

npm install express nodemon dotenv zod nanoid redis @types/cors @types/express @types/node tsx typescript cors

create the tsconfig.json file

---> Checkout TSConfig Cheat Scheet Checkout

--> Add the scripts to the package.json file

--> Also fix this ==> npm install -D ts-node typescript (it will fix the issue of ts-node)

```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "start": "tsx src/server.ts"
  }
}
```

Create a .env file

```env
PORT=3000
REDIS_URL=redis://localhost:6379
```

<!-- Benefits of tsx watch
Zero Config: It natively resolves ES Modules (ESM) and supports typescript configurations (moduleResolution: NodeNext, .js extension imports in .ts files) without any custom loader registration flags.
Fast: It utilizes Esbuild under the hood.
Built-in Watching: It has file watching built-in, meaning you no longer need nodemon for restarting the server. -->
