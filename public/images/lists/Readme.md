# Lists in Redis

List in redis are defined as "collection of strings sorted by insertion order."
They are implemented using linked lists.

# List commands

## LPUSH
LPUSH key value [value ...]

This command is used to add a new value or more values to the list.
First argument is the key name which is "queue:1" in this case.
Second argument is the value which is "Task1" in this case.

## RPUSH
RPUSH key value [value ...]

This command is used to add a new value or more values to the list.
First argument is the key name which is "queue:1" in this case.
Second argument is the value which is "Task1" in this case.

LPUSH "queue:1" "Task1"
LPUSH "queue:1" "Task2"
LPUSH "queue:1" "Task3"
LPUSH "queue:1" "Task4"
LPUSH "queue:1" "Task5"

RPUSH "queue:1" "Task1"
RPUSH "queue:1" "Task2"
RPUSH "queue:1" "Task3"
RPUSH "queue:1" "Task4"
RPUSH "queue:1" "Task5"


## LPOP && RPOP

LPOP key

This command is used to remove and return the first element from the list.

RPOP key

This command is used to remove and return the last element from the list.

LPOP "queue:1" 
RPOP "queue:1"

more better view

## LINSERT
LINSERT key BEFORE|AFTER pivot value

This command is used to insert a new value or more values to the list.
First argument is the key name which is "queue:1" in this case.
Second argument is the position where the new value is to be inserted which is "BEFORE" or "AFTER" in this case.
Third argument is the value which is "Task1" in this case.

LINSERT "queue:1" BEFORE "Task3" "Task6"
LINSERT "queue:1" AFTER "Task3" "Task7"



## LRANGE
LRANGE key start stop

This command is used to get the values from the list.
First argument is the key name which is "queue:1" in this case.
Second argument is the start index which is "0" in this case.
Third argument is the stop index which is "-1" in this case.