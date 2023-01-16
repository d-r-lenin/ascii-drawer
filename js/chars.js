function factors (number){ 
    return Array
        .from(Array(number + 1), (_, i) => i)
        .filter(i => number % i === 0)
}

async function getAllValidChars (ch, fontFamily) {
    let fontData = await getFontData();
    const backgrond = ch ||" ";

    const backgroundWidth = fontData[getNameOfCharecter(backgrond.charCodeAt(0))];

    // get all the charecters whit width multiple to backgroundWidth
    const multiplesKeys = Object.keys(fontData).filter((charecter) => {
        let result = false;
        if (fontData[charecter] % backgroundWidth < 5) result = true ;
        if (fontData[charecter] == 0) result = false ;

        const factorsOfWidth = factors(fontData[charecter]);

        factorsOfWidth.forEach((factor) => {
            if (factor % backgroundWidth < 5) result = true ;
        });

        return result;
    });
    
    const multiplesFormData = {};

    multiplesKeys.forEach((key) => {
        multiplesFormData[key] = fontData[key];
    })

    console.log(multiplesFormData);

    const charecters = {};
    const charectersKeys = Object.keys(multiplesFormData);

    charectersKeys.forEach((key) => {
        let code = getCodeOfCharName(key);
        if(!code) return;
        if(String.fromCharCode(code) == "") return;
        charecters[code] = String.fromCharCode(code);
    });

    return charecters;

};


async function getFontData(){
    const font = await fetch("fonts/arial.afm");
    const fontData = await font.text();
    // check which charecter has value of diff in fontData
    const lines = fontData.split("\n");
    // only starts with "C " and ends with " ;
    const validLines = lines.filter((line) => {
        return line.startsWith("C ") && line.endsWith(" ;");
    });
    const widthMap = {};

    validLines.forEach((line) => {
        const charecter = line.split("N")[1].split(";")[0].trim();
        const width = line.split("WX")[1].split(";")[0].trim();
        widthMap[charecter] = width;
    });

    return widthMap;
}


// this function should be able to convert charecters like " ", ",", "A" to "space", "comma", "A" respectively
function getNameOfCharecter(charCode) {
    // get string that represents the character code
    var char = ascii.get(charCode);
    return char;
}

function getCodeOfCharName (charName) {
    for (let [key, value] of ascii.entries()) {
        if (value === charName) {
            return key;
        }
    }
}
