const generateCode = size => {
    const caracters = '0123456789abcdefghijlmnopqrstuwvxz'.split('');
    let code = '';

    for (let i = 0; i < size; i++) {
        code += caracters[Math.floor(Math.random() * caracters.length)];
    }

    return code;
}

const generateRandomId = sizes => {
    let codes = [];

    for (let s in sizes) {
        codes.push(generateCode(sizes[s]));
    }

    let randomId = '';

    for (let c in codes) {
        randomId += `${codes[c]}-`;
    }

    randomId = randomId.substr(0, (randomId.length - 1));

    return randomId;
}

module.exports = { generateRandomId };