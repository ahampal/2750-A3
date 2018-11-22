#Flags
CC = gcc
CFLAGS = -Wall -std=c11 -g

#rules
#main: 
#	$(CC) $(CFLAGS) StructListDemo.c LinkedListAPI.c -o main -g
	
list:
	$(CC) $(CFLAGS) -c src/LinkedListAPI.c -Iinclude -o bin/LinkedListAPI.o
	ar rc bin/LinkedListAPI.a bin/LinkedListAPI.o
	ranlib bin/LinkedListAPI.a

parser:
	$(CC) $(CFLAGS) -c src/VCardParser.c -Iinclude -o bin/VCardParser.o
	ar rc bin/VCardParser.a bin/VCardParser.o
	ranlib bin/VCardParser.a

clean:
	rm -f bin/*.o bin/*.a

fullClean:
	rm -f bin/*

buildTest:
	$(CC) $(CFLAGS) src/testAPI.c src/CardTestUtilities.c src/LinkedListAPI.c src/VCardParser.c src/TestHarness2.c -Iinclude -o bin/testAPI -g

runTest: buildTest
	cd bin; \
	  valgrind --show-leak-kinds=all --leak-check=full --track-origins=yes ./testAPI ../test_files/testCard.vcf
	  cd ..;

all: list parser buildTest runTest fullClean

parserDynamic:
	$(CC) $(CFLAGS) -fpic -c src/VCardParser.c -Iinclude -o VCardParser.o
	$(CC) $(CFLAGS) -fpic -c src/LinkedListAPI.c -Iinclude -o LinkedListAPI.o
	cd ..; \
	$(CC) -shared -o libVCardParser.so parser/VCardParser.o parser/LinkedListAPI.o
	rm -f *.o
	cd ../parser;


