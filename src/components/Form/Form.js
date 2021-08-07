import classes from "./Form.module.css";
import { useRef, useState } from "react";
import { getMonths, getYears, maskCardNumber, getCardType, SKIN_OPTIONS } from "./utils";
import CreditCardFront from "../credit card/CreditCardFront";
import { CARD_TYPES } from "../credit card/utils";
import CreditCardBack from "../credit card/CreditCardBack";

function Form() {
  let months = getMonths();
  let years = getYears();

  const cardNumberRef = useRef();
  const cardNameRef = useRef();
  const cvvRef = useRef();
  const expiryMonthRef = useRef();
  const expiryYearRef = useRef();
  const [cardType, setCardType] = useState(CARD_TYPES.amex);
  const [cardNumber, setCardNumber] = useState("####-####-####-####");
  const [cardHolder, setCardHolder] = useState("ad soyad");
  const [expiryMonth, setExpiryMonth] = useState();
  const [expiryYear, setExpiryYear] = useState();
  const [cvv, setCvv] = useState();
  const [cardSide, toggleCardSide] = useState(false);
  const [currentActive, setCurrentActive] = useState();
  const [skin, setSkin] = useState(SKIN_OPTIONS.skin1);

  function handleCardInput() {
    let numbers = maskCardNumber(cardNumberRef);
    let cardType = getCardType(numbers.replace(/(\D)/g, ""));
    if (cardType) {
      console.log(cardType)
      setCardType(CARD_TYPES[cardType.toLowerCase()]);
    }
    setCardNumber(prev=> {
     let original = prev.split('');
     let entered = numbers.split('')
      entered.forEach((item,idx) => {
        original[idx] = entered[idx]
      })
      return original.join('');
    });
  }

  return (
    <div className="d-flex justify-content-center align-items-center app" onClick={() => toggleCardSide(false)}>
      <div className="form-container">
        <div
          className={`${classes.flip} ${
            cardSide ? classes.rotateBack : classes.rotateFront
          }`}>
          {cardSide ? (
            <CreditCardBack
              {...{
                cvv,
                cardType,
                currentActive,
                skin
              }}
            />
          ) : (
            <CreditCardFront
              {...{
                cardNumber,
                cardHolder,
                expiryMonth,
                expiryYear,
                cardType,
                currentActive,
                skin
              }}
            />
          )}
        </div>
        <div className={`${classes.skinContainer} d-flex justify-content-center`}>
        {
          Object.keys(SKIN_OPTIONS).map((item, idx) => <div className={`${classes.skins} d-flex justify-content-center`} style={{ backgroundImage: `url('${SKIN_OPTIONS[item]}')`}} onClick={() => {
            setSkin(SKIN_OPTIONS[item])
          }}></div>)
        }

        </div>
        
        <form>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="card-number">
              Card Number
            </label>
            <input
              type="tel"
              id="card-number"
              className="form-control"
              maxLength="19"
              placeholder="#### - #### - #### - ####"
              ref={cardNumberRef}
              onChange={handleCardInput}
              onFocus={() => {
                setCurrentActive("card");
              }}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="card-holder-name">
              Card Name
            </label>
            <input
              type="text"
              id="card-holder-name"
              className={`form-control ${classes.uppercase}`}
              ref={cardNameRef}
              onChange={() => {
                setCardHolder(cardNameRef.current.value);
              }}
              onFocus={() => {
                setCurrentActive("name");
              }}
            />
          </div>
          <label>Expiration Date</label>
          <div className="form-outline mb-4 d-flex justify-content-between align-items-center">
            <div className={`d-flex justify-content-between ${classes.expiry}`}>
              <select
                className={`${classes["expiry-box"]} mdb-select md-form form-control`}
                ref={expiryMonthRef}
                onChange={() => {
                  setExpiryMonth(expiryMonthRef.current.value);
                }}
                onFocus={() => {
                  setCurrentActive("expiry");
                }}
                >
                <option value="" disabled selected>
                  Month
                </option>
                {months.map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))}
              </select>
              <select
                className={`${classes["expiry-box"]} mdb-select md-form form-control`}
                ref={expiryYearRef}
                onChange={() => {
                  setExpiryYear(expiryYearRef.current.value);
                }}
                onFocus={() => {
                  setCurrentActive("expiry");
                }}
                >
                <option value="" disabled selected>
                  Year
                </option>
                {years.map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="tel"
                id="cvv"
                className="form-control"
                placeholder="CVV"
                maxlength="3"
                ref={cvvRef}
                onChange={() => {
                  setCvv(cvvRef.current.value);
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleCardSide(true)
                }}
                onFocus={() => {  
                  setCurrentActive("cvv");}}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
