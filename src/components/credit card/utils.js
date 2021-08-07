export const CARD_TYPES = {
  amex: {
    name: "Amex",
    color: "green",
    image: "/assets/logos/amex.png",
  },
  visa: {
    name: "Visa",
    color: "lime",
    image: "/assets/logos/visa.png",
  },
  diners: {
    name: "Diners",
    color: "orange",
    image: "/assets/logos/dinersclub.png",
  },
  discover: {
    name: "Discover",
    color: "purple",
    image: "/assets/logos/discover.png",
  },
  jcb: {
    name: "Jcb",
    color: "red",
    image: "/assets/logos/jcb.png",
  },
  mastercard: {
    name: "Mastercard",
    color: "lightblue",
    image: "/assets/logos/mastercard.png",
  },
  unionpay: {
    name: "Unipay",
    color: "cyan",
    image: "/assets/logos/unionpay.png",
  },
  maestro: {
    name: "Maestro",
    color: "yellow",
    image: "/assets/logos/maestro.png",
  },
};

export function formatMonth(month) {
  if (month) {
    if (month.length === 1) {
      return 0 + month;
    } else {
      return month;
    }
  }
}

export function formatYear(year) {
  if (year) {
    return year.split("").splice(2, 2).join("");
  }
}