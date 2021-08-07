export const CVC_LENGTH = 3;
export const MAX_CARD_LENGTH = 22;
export const DEFAULT_CARD_NAME = "ad soyad";
export const DEFAULT_CARD_NUMBER = "####-####-####-####";
export const MIN_CARD_LENGTH = 16;
export const NUMBER_ONLY_REGEX = "[0-9]+";


export function getMonths() {
  let months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  return months;
}

export function getYears() {
  let years = [];
  const startYear = 2021;
  const endYear = 2030;

  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }
  return years;
}

export function maskCardNumber(cardNumberRef) {
  const cardValue = cardNumberRef.current.value
    .replace(/\D/g, "")
    .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
  cardNumberRef.current.value = !cardValue[2]
    ? cardValue[1]
    : `${cardValue[1]} ${cardValue[2]}${`${
        cardValue[3] ? ` ${cardValue[3]}` : ""
      }`}${`${cardValue[4] ? ` ${cardValue[4]}` : ""}`}`;
  return cardNumberRef.current.value;
}

export function getCardType(cardNum) {
  // console.log(cardNum)
  var payCardType = "";
  var regexMap = [
    { regEx: /^4[0-9]{5}/gi, cardType: "VISA" },
    { regEx: /^5[1-5][0-9]{4}/gi, cardType: "MASTERCARD" },
    { regEx: /^3[47][0-9]{3}/gi, cardType: "AMEX" },
    { regEx: /^(5[06-8]\d{4}|6\d{5})/gi, cardType: "MAESTRO" },
  ];

  for (var j = 0; j < regexMap.length; j++) {
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
    var g = "508500-508999|606985-607984|608001-608500|652150-653149";
    var i = g.split("|");
    for (var d = 0; d < i.length; d++) {
      var c = parseInt(i[d].split("-")[0], 10);
      var f = parseInt(i[d].split("-")[1], 10);
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
  return payCardType;
}

export const SKIN_OPTIONS = {
  'skin1': "/assets/credit card backgrounds/4.jpeg",
  'skin2': "/assets/credit card backgrounds/6.jpeg",
  'skin3': "/assets/credit card backgrounds/7.jpeg",
  'skin4': "/assets/credit card backgrounds/8.jpeg",
  'skin5': "/assets/credit card backgrounds/13.jpeg",
  'skin6': "/assets/credit card backgrounds/18.jpeg",
}