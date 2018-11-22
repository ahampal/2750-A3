#include "VCardParser.h"

int main(int argc, char **argv) {
    char *retString;
    retString = CardToJSON(argv[1]);
    printf("%s\n", retString);
    free(retString);
    return 0;
}