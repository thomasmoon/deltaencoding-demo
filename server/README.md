# Text Compression Microservice

This microservices performs two functions

1. /compress    Compresses posted string using delta encoding.

2. /decompress  Decompresses posted string

All other routes returns error 415 (unsupported media type).

## Requirements

This project uses Express, Body Parser and custom library DeltaEncoder found in ```lib/deltaencoder```.

The parser limit is set to 5MB to allow for the english dictionary wordlist.

## Installation

Installation may be performed automatically by the parent project that contains the client for demonstration, but can also be performed with:
```npm i```

## Running

To start the server:

```npm start```

## Testing

There are two unit tests that are run against the http server using Mocha Chai for http (chai-http).

1. Compression works for sample text
2. Decompression works for sample text

Install Mocha globally:
```npm install -g mocha```

Run tests in a seperate window:
```npm test```

You can also test with custom wordlists from the command line using curl, which will save the output to its own file:
```curl -X POST --data-binary words.txt http://localhost:3000/compress > words_compressed.txt```

Then this same file can be run back through the decompresser and the output can be observed in the console:
```curl -X POST --data-binary words_compressed.txt http://localhost:3000/decompress```

Get your own world list from here:
[https://raw.githubusercontent.com/dwyl/english-words/master/words.txt](https://raw.githubusercontent.com/dwyl/english-words/master/words.txt)

Save it directly to the words.txt file
```curl https://raw.githubusercontent.com/dwyl/english-words/master/words.txt > words.txt```

