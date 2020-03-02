# Text Compressor

This service featuring react SPA client and NodeJS microservice backend, compresses text using the _delta encoding_ algorithm found in its own class of the same name.

This demo was created as a recruitment task for Aito.ai.

![Screenshot](/client/public/screenshot.png?raw=true "Screenshot")

## Installation

This application contains three self-contained packages:

1. client/

This SPA sends text over ajax to the microservice and displays the converted text in the same text are as the input.

2. server/

This microservice provides too routes for POST requests /compress and /decompress

3. server/lib/deltaencoder

This class contains the actual algorithm that the server uses.

Perfoming the following command from the project route will install the dependencies for each package, but please run the client and server packages in their own window.

See each packages readme file for more info.