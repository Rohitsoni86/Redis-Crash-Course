# Hashes in Redis

These are the key hashes for the restaurants in redis : 

field	value
restaurant:1	name "The Italian Place" address "123 Main St" cuisine "[\"Italian\"]" rating "4.5" reviews "[]"
restaurant:2	name "Spice Garden" address "456 Elm St" cuisine "[\"Indian\"]" rating "4.7" reviews "[]"
restaurant:3	name "Mexican Fiesta" address "789 Oak St" cuisine "[\"Mexican\"]" rating "4.3" reviews "[]"
restaurant:4	name "Sushi Zone" address "101 Pine St" cuisine "[\"Japanese\"]" rating "4.9" reviews "[]"


# HSET command
HSET restaurant:1 name "The Italian Place" address "123 Main St" cuisine "[\"Italian\"]" rating "4.5" reviews "[]"
HSET restaurant:2 name "Spice Garden" address "456 Elm St" cuisine "[\"Indian\"]" rating "4.7" reviews "[]"
HSET restaurant:3 name "Mexican Fiesta" address "789 Oak St" cuisine "[\"Mexican\"]" rating "4.3" reviews "[]"
HSET restaurant:4 name "Sushi Zone" address "101 Pine St" cuisine "[\"Japanese\"]" rating "4.9" reviews "[]"

This command is used to create a new hash or update an existing hash.
First argument is the key name which is "restaurant:1", "restaurant:2", "restaurant:3", "restaurant:4" in this case.
Second argument is the field name which is "name", "address", "cuisine", "rating", "reviews" in this case.
Third argument is the value which is "The Italian Place", "123 Main St", "[\"Italian\"]", "4.5", "[]" in this case.


# HGET command
HGET restaurant:1 name
HGET restaurant:2 name
HGET restaurant:3 name
HGET restaurant:4 name

This command is used to get the value of a field in a hash.
First argument is the key name which is "restaurant:1", "restaurant:2", "restaurant:3", "restaurant:4" in this case.
Second argument is the field name which is "name", "address", "cuisine", "rating", "reviews" in this case.


# HGETALL command
HGETALL restaurant:1
HGETALL restaurant:2
HGETALL restaurant:3
HGETALL restaurant:4

This command is used to get all the fields and values in a hash.
First argument is the key name which is "restaurant:1", "restaurant:2", "restaurant:3", "restaurant:4" in this case.


# HSETNX restaurant:1 name "New Name"

This command is used to create a new hash or update an existing hash if the field does not exist.
First argument is the key name which is "restaurant:1" in this case.
Second argument is the field name which is "name" in this case.
Third argument is the value which is "New Name" in this case.

HSETNX command is used to create a new hash or update an existing hash if the field does not exist.
First argument is the key name which is "restaurant:1" in this case.
Second argument is the field name which is "name" in this case.
Third argument is the value which is "New Name" in this case.


# HSETNX restaurant:1 name "New Name"

This command is used to create a new hash or update an existing hash if the field does not exist.
First argument is the key name which is "restaurant:1" in this case.
Second argument is the field name which is "name" in this case.
Third argument is the value which is "New Name" in this case.

# HSETNX command is used to create a new hash or update an existing hash if the field does not exist.
First argument is the key name which is "restaurant:1" in this case.
Second argument is the field name which is "name" in this case.
Third argument is the value which is "New Name" in this case.

# HSETNX restaurant:1 name "New Name"

This command is used to create a new hash or update an existing hash if the field does not exist.
First argument is the key name which is "restaurant:1" in this case.
Second argument is the field name which is "name" in this case.
Third argument is the value which is "New Name" in this case.

# HSETNX restaurant:1 name "New Name"

This command is used to create a new hash or update an existing hash if the field does not exist.
First argument is the key name which is "restaurant:1" in this case.
Second argument is the field name which is "name" in this case.
Third argument is the value which is "New Name" in this case.
