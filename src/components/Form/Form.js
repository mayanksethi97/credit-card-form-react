import classes from "./Form.module.css";
import { useRef, useState } from "react";
import {
  getMonths,
  getYears,
  maskCardNumber,
  getCardType,
  SKIN_OPTIONS,
  DEFAULT_CARD_NUMBER,
  DEFAULT_CARD_NAME,
  CVC_LENGTH,
  NUMBER_ONLY_REGEX,
  CARD_LENGTH,
  MAX_CARD_LENGTH,
  MIN_CARD_LENGTH,
} from "./utils";
import CreditCardFront from "../credit card/CreditCardFront";
import { CARD_TYPES } from "../credit card/utils";
import CreditCardBack from "../credit card/CreditCardBack";
import { useForm } from "react-hook-form";

function Form() {
  let months = getMonths();
  let years = getYears();

  const cardNumberRef = useRef();
  const cardNameRef = useRef();
  const cvvRef = useRef();
  const expiryMonthRef = useRef();
  const expiryYearRef = useRef();

  const [cardType, setCardType] = useState(CARD_TYPES.amex);
  const [cardNumber, setCardNumber] = useState(DEFAULT_CARD_NUMBER);
  const [cardHolder, setCardHolder] = useState(DEFAULT_CARD_NAME);
  const [expiryMonth, setExpiryMonth] = useState();
  const [expiryYear, setExpiryYear] = useState();
  const [cvv, setCvv] = useState();
  const [cardSide, toggleCardSide] = useState(false);
  const [currentActive, setCurrentActive] = useState();
  const [skin, setSkin] = useState(SKIN_OPTIONS.skin1);

  const { register, handleSubmit, formState: { errors } } = useForm({mode: 'all', reValidateMode: 'onChange'});
  const onSubmit = data => {
    console.log(data);
  };

  function handleCardInput(e) {
    let numbers = maskCardNumber(cardNumberRef);
    let cardType = getCardType(numbers.replace(/(\D)/g, ""));
    if (cardType) {
      setCardType(CARD_TYPES[cardType.toLowerCase()]);
    }
    setCardNumber((prev) => {
      let original = DEFAULT_CARD_NUMBER.split("");
      let entered = numbers.split("");
      entered.forEach((item, idx) => {
        original[idx] = entered[idx];
      });
      return original.join("");
    });
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center app"
      onClick={() => toggleCardSide(false)}>
      <div className="form-container">
        <div
          className={`${classes.flip} ${
            cardSide ? classes.rotateBack : classes.rotateFront
          }`}
          >
          {cardSide ? (
            <CreditCardBack
              {...{
                cvv,
                cardType,
                currentActive,
                skin,
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
                skin,
              }}
            />
          )}
        </div>
        <div
          className={`${classes.skinContainer} d-flex justify-content-center`}>
          {Object.keys(SKIN_OPTIONS).map((item, idx) => (
            <div
              className={`${classes.skins} d-flex justify-content-center`}
              style={{ backgroundImage: `url('${SKIN_OPTIONS[item]}')` }}
              onClick={() => {
                setSkin(SKIN_OPTIONS[item]);
              }}></div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`form-outline mb-4 ${errors.cardNumber ? 'error' : ''}`}>
            <label className="form-label" htmlFor="card-number">
              Card Number 
            </label>
            <input
            {...register("cardNumber", { required: 'Card Number is Required', maxLength: {
              value: MAX_CARD_LENGTH,
              message: 'Card number not Valid'
            }, minLength: {
              value: MIN_CARD_LENGTH,
              message: 'Card number not Valid'
            } })}
              type="tel"
              id="card-number"
              className="form-control"
              placeholder="#### - #### - #### - ####"
              ref={cardNumberRef}
              onChange={handleCardInput}
              onFocus={() => {
                setCurrentActive("card");
              }}
            />
            {errors.cardNumber?.message && <p className="error-description">{errors.cardNumber?.message}</p>}
            
          </div>

          <div className={`form-outline mb-4 ${errors.cardHolderName ? 'error' : ''}`}>
            <label className="form-label" htmlFor="card-holder-name">
              Card Name
            </label>
            <input
            {...register("cardHolderName", { required: "Name is Required", })}
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
           
            {errors.cardHolderName &&  <p className="error-description">{errors.cardHolderName?.message}</p>}
          </div>
          <label>Expiration Date</label>
          <div className="form-outline mb-4 d-flex justify-content-between align-items-center">
            <div className={`d-flex justify-content-between ${classes.expiry}`}>
             <div className={` ${errors.expiryMonth?.type === 'required' ? 'error' : ''}`}>
             <select
              {...register("expiryMonth", { required: "Month is Required"})}
                className={`${classes["expiry-box"]} mdb-select md-form form-control`}
                ref={expiryMonthRef}
                onChange={() => {
                  setExpiryMonth(expiryMonthRef.current.value);
                }}
                onFocus={() => {
                  setCurrentActive("expiry");
                }}>
                <option value="" disabled selected>
                  Month
                </option>
                {months.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
             </div>
             <div className={` ${errors.expiryYear ? 'error' : ''}`}>
             <select
              {...register("expiryYear", { required: "Year is reuiqred"})}
                className={`${classes["expiry-box"]} mdb-select md-form form-control`}
                ref={expiryYearRef}
                onChange={() => {
                  setExpiryYear(expiryYearRef.current.value);
                }}
                onFocus={() => {
                  setCurrentActive("expiry");
                }}>
                <option value="" disabled selected>
                  Year
                </option>
                {years.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
             </div>
            </div>
            {(errors.expiryMonth?.message || errors.expiryYear?.message) && <p className="error-description"  style={{position: 'absolute', marginTop: '6em'}}>Expiry Date is required</p>}
            
            <div className={` ${errors.cvv ? 'error' : ''}`}>
              <input
              {...register("cvv", { required: "CVV is required", pattern: {
                value: /^[0-9\b]+$/,
                message: 'Cvv must contain numbers'
              } })}
                type="text"
                id="cvv"
                className="form-control"
                placeholder="CVV"
                maxLength={CVC_LENGTH}
                ref={cvvRef}
                onChange={() => {
                  setCvv(cvvRef.current.value);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCardSide(true);
                }}
                onFocus={() => {
                  setCurrentActive("cvv");
                }}
              />
              
              {errors.cvv?.message && <p className="error-description" style={{position: 'absolute'}}>{errors.cvv?.message}</p>}
              
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
