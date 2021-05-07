{
  "targets": [
    {
      "target_name": "parser",
      "sources": [
        "parser/src/VCardParser.c",
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "parser/include"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")",
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "defines": ["NAPI_CPP_EXCEPTIONS"]
    }
  ]
}