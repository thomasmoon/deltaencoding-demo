class DeltaEncoder {

    constructor (text) {

        // Info to console
        console.log('Initiate Delta Encoder');

        // Input and processing vars
        this.linesOfInput = text.split('\n');
        this.previous = '';
    }
    compress () {

        // Print input text to console
        console.log('Compress text:', this.linesOfInput);

        // Evaluate each line of text individually
        let compressedLines = this.linesOfInput.map(line=>{
           
            // Walk backwords through the characters of the last word to find matches
            for (let char=this.previous.length; char>0; char--) {

                //console.log('Check for string: ' + this.previous.substr(0, char));
                //console.log('In string: ' + line);

                // Look for matches for the string up to the current position
                if (line.indexOf(this.previous.substr(0, char)) > -1) {

                    //console.log('String was found.');

                    // if it exists return this as the previous
                    this.previous = line;
                    // Return the count of shared characters plus the unique chars
                    // Note the use of substring to get the characters from current position till the end
                    return char + ' ' + line.substring(char);
                
                } else {
                    //console.log('String not found.');
                }
            }

            // if we make it here, there was no match
            this.previous = line;
            return 0 + ' ' + line;
        });

        console.log(compressedLines);

        return compressedLines.join('\n');
    }
    decompress () {

        console.log('Decompress text:', this.linesOfInput);

        const parseLineExp = /^(\d+) (\w+)/

        // Evaluate each line of text individually
        let decompressedLines = this.linesOfInput.map(line=>{

            console.log('Line: ', line)
           
            // 1) Split the line into index and word
            let parseLine = line.match(parseLineExp);

            console.log('Parse line:', parseLine);

            let word;

            // we could have some handling for bad rows here
            if (parseLine !== null) {
                // parseLine[0] contains whole match, followed by groups
                let previousLength = parseLine[1];
                let wordSegment  = parseLine[2];

                if (previousLength === 0) {
                    word = wordSegment;
                } else {
                    word = this.previous.substr(0, previousLength) + wordSegment;
                }
            } else {
                word = '';
            }

            console.log('Word', word);

            this.previous = word;

            return word;
        });

        console.log(decompressedLines);

        return decompressedLines.join('\n');
    }
}

exports.DeltaEncoder = DeltaEncoder;