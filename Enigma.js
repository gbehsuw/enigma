document.getElementById("inputMessage").addEventListener("submit", function (event) {
    event.preventDefault();
    let message = document.getElementById("message").value;
    // Variables
  let shift_1 = 0;
  let shift_2 = 0;
  let shift_3 = 0;
  let revState = false;
  const alphabet = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m','n','o','p','q','r', 's','t','u','v','w','x','y','z']

    const cipher1 = document.getElementById("cipher1");
    const cipher2 = document.getElementById("cipher2");
    const cipher3 = document.getElementById("cipher3");

  // Generate Cipher Function
  function generateCipher(num) {
    let cipher = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m','n','o','p','q','r', 's','t','u','v','w','x','y','z']
    
    // find what cipher number to use
    let cipherNum;
    if (num == 1) {
      cipherNum = cipher1;
    } else if (num == 2) {
      cipherNum = cipher2;
    } else {
      cipherNum = cipher3;
    }

    for (let i = 0; i < cipherNum.value; i++) {
      cipher.unshift(cipher[cipher.length-1])
      cipher.pop()
    }

    console.log(cipher);
    return cipher
  }

  // shuffles an array
  function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }


  // generates plugboard
  function generatePlugboard() {
    let cipher = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m','n','o','p','q','r', 's','t','u','v','w','x','y','z'];
    shuffle(cipher);
    let numOfCablesNotUsed = 10;
    for (let i = 0; i < numOfCablesNotUsed*2; i++) {
      cipher.pop();
    }
    return cipher;
  }

  // runs plugboard
  function plugboard(shuffledAlpha, char) {
    if (shuffledAlpha.includes(char)) {
      let index = shuffledAlpha.indexOf(char);
      if (index % 2 == 0) {
        return shuffledAlpha[index + 1];
      } else {
        return shuffledAlpha[index - 1];
      }
    } else {
      return char;
    }
  }

  // generates reverser
  function generateReverser() {
    let cipher = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m','n','o','p','q','r', 's','t','u','v','w','x','y','z'];
    shuffle(cipher);
    return cipher;
  }

  // runs the reverser
  function runReverser(letter, reverser) {
    let index = reverser.indexOf(letter);
    if (index % 2 == 0) {
      return reverser[index + 1]
    } else {
      return reverser[index - 1]
    }
  }
    
  // Shifting the Cipher
  function shiftCipher(shift, cipher) {
    for (let i = 0; i < shift; i++) {
      cipher.unshift(cipher[cipher.length-1])
      cipher.pop()
    }
    return cipher
  }

  // Runs a character through the ciphers
  function runCiphers(letter, revState) {
    if (revState == false) {
      
      // Finding letter index
      let letter_index = alphabet.indexOf(letter);
      // Shifting cipher
      cipher_1 = shiftCipher(shift_1, cipher_1);
      // Changing letter
      letter = cipher_1[letter_index]
      
      letter_index = alphabet.indexOf(letter);
      cipher_2 = shiftCipher(shift_2, cipher_2);
      letter = cipher_2[letter_index]
      
      letter_index = alphabet.indexOf(letter);
      cipher_3 = shiftCipher(shift_3, cipher_3);
      return cipher_3[letter_index]
    } else {
      let letter_index = alphabet.indexOf(letter);
      cipher_3 = shiftCipher(shift_3, cipher_3);
      letter = cipher_3[letter_index]
      
      letter_index = alphabet.indexOf(letter);
      cipher_2 = shiftCipher(shift_2, cipher_2);
      letter = cipher_2[letter_index]
      
      letter_index = alphabet.indexOf(letter);
      cipher_1 = shiftCipher(shift_1, cipher_1);
      return cipher_1[letter_index]
    }
  }

// generate
  let cipher_1 = generateCipher(1);
  let cipher_2 = generateCipher(2);
  let cipher_3 = generateCipher(3);
  let plugBoard = generatePlugboard();
  let alphaReverser = generateReverser();

  // MAIN LOOP
  let newMessage = "";
  for (let l of message) {
    // check for upper
    let newL = l;
    let isUpper = false;
    if (newL == newL.toUpperCase()) {
      isUpper = true;
      l = l.toLowerCase();
    }

    // for letters
    if (alphabet.includes(l)) {
      
      letter = plugboard(plugBoard, l)

      letter = runCiphers(letter, revState);
      shift_1 += 1;
      if (shift_1 >= 26) {
        shift_1 = 0;
        shift_2 += 1;
      }
      if (shift_2 >= 26) {
        shift_2 = 0;
        shift_3 += 1;
      }
      if (shift_3 >= 26) {
        shift_3 = 0;
      }
      revState = true;

      letter = runReverser(letter, alphaReverser);

      letter = runCiphers(letter, revState);
      shift_1 += 1;
      if (shift_1 >= 26) {
        shift_1 = 0;
        shift_2 += 1;
      }
      if (shift_2 >= 26) {
        shift_2 = 0;
        shift_3 += 1;
      }
      if (shift_3 >= 26) {
        shift_3 = 0;
      }
      revState = false;

      plugboard(plugBoard, letter)

      // in case of uppers
      if (isUpper) {
        letter = letter.toUpperCase();
      }

      // adjust message
      newMessage += letter;
    } 
    
    // not letters
    else {
      newMessage += l;
    }
    
  }

  // output message to html element
  document.getElementById("outputMessage").innerHTML = newMessage;
    document.querySelector(".stats").innerHTML = `
  Plugboard: ${plugBoard.toString()}
  Reverser: ${alphaReverser.toString()}
  `;
});

