import { useState } from "react";

function useDetectCard(cardNum) {
  const [cardType, setCardType] = useState("");
  const [cardError, setCardError] = useState(false);


  function detect() {
    let payCardType = "";
    let regexMap = [
      { regEx: /^4[0-9]{5}/gi, cardType: "VISA" },
      { regEx: /^5[1-5][0-9]{4}/gi, cardType: "MASTERCARD" },
      { regEx: /^3[47][0-9]{3}/gi, cardType: "AMEX" },
      { regEx: /^(5[06-8]\d{4}|6\d{5})/gi, cardType: "MAESTRO" },
    ];

    for (let j = 0; j < regexMap.length; j++) {
      if (cardNum.match(regexMap[j].regEx)) {
        payCardType = regexMap[j].cardType;
        break;
      }
    }

    if (
      cardNum.indexOf("50") === 0 ||
      cardNum.indexOf("60") === 0 ||
      cardNum.indexOf("65") === 0
    ) {
      let g = "508500-508999|606985-607984|608001-608500|652150-653149";
      let i = g.split("|");
      for (let d = 0; d < i.length; d++) {
        let c = parseInt(i[d].split("-")[0], 10);
        let f = parseInt(i[d].split("-")[1], 10);
        if (
          cardNum.substr(0, 6) >= c &&
          cardNum.substr(0, 6) <= f &&
          cardNum.length >= 6
        ) {
          payCardType = "RUPAY";
          break;
        }
      }
    }
    if (payCardType) {
      setCardType(payCardType);
    } else {
      setCardError(true);
    }
  }
  return { cardType, cardError, detect };
}

export default useDetectCard;
