# A simple nodejs-redis tutorial for beginners

![alt text](http://www.nikola-breznjak.com/blog/wp-content/uploads/2015/02/NodeRedis.jpg)

## Strings

String is the basic data type supported by Redis. You can set the string value of a key, and you can get the string value of a key using SET and GET commands.

## Lists

List is an ordered collection which lets you add any number of elements in it. The element can be unique or non-unique. Apart from adding and getting elements from a list, Redis supports lots of operations for lists like pop, push, range, etc.

## Sets

Sets are unordered collections of binary strings. To add an element to a set you use the SADD command and to get all the members of a set you use the SMEMBERS command.

## Hashes

Hashes allow you store key-value pair against a hash. This can be useful in scenarios where you want to save an object with several properties.

## Incr Value

Increments the number stored at key by one. If the key does not exist, it is set to 0 before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer. This operation is limited to 64 bit signed integers.
Note: this is a string operation because Redis does not have a dedicated integer type. The string stored at the key is interpreted as a base-10 64 bit signed integer to execute the operation.
Redis stores integers in their integer representation, so for string values that actually hold an integer, there is no overhead for storing the string representation of the integer.

## Exists

Returns if key exists.
Since Redis 3.0.3 it is possible to specify multiple keys instead of a single one. In such a case, it returns the total number of keys existing. Note that returning 1 or 0 for a single key is just a special case of the variadic usage, so the command is completely backward compatible.
The user should be aware that if the same existing key is mentioned in the arguments multiple times, it will be counted multiple times. So if somekey exists, EXISTS somekey somekey will return 2.
