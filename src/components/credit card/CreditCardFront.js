import classes from "./CreditCard.module.css";
import { formatMonth, formatYear } from "./utils";

const chip = "/assets/logos/chip.png";

function CreditCardFront(props) {

  return (
    <div
      className={`${classes.card} d-flex justify-content-between flex-column align-items-center`} style={{ backgroundImage: `url('${props.skin}')`}}>
      <div
        className={`d-flex justify-content-between ${classes["logo-container"]}`}>
        <img src={chip} alt="chip" />
        <img src={props.cardType.image} alt="logo" />
      </div>
      <div>
        <h5 className={`${classes.orbitron} ${props.currentActive === 'card' ? classes.active : ''}`}>
          {props.cardNumber.split('').map((item, idx) => <span key={idx} className={classes.text}>{item}</span>)}
        </h5>
      </div>
      <div className="d-flex justify-content-between" style={{ width: "100%" }}>
        <div className={` ${props.currentActive === 'name' ? classes.active : ''} d-flex justify-content-center flex-column`}>
          <p className={`${classes.orbitron} ${classes["card-label"]}`}>
            Card Holder
          </p>
          <h6 className={`${classes.orbitron} ${classes.uppercase}`}>{props.cardHolder}</h6>
        </div>
        <div className={`${props.currentActive === 'expiry' ? classes.active : ''}`}>
          <p className={`${classes.orbitron} ${classes["card-label"]}`}>
            Expires
          </p>
          <h6 className={`${classes.orbitron}`}>{formatMonth(props.expiryMonth)  || 'MM'}/{ formatYear(props.expiryYear)|| 'YY'}</h6>
        </div>
      </div>
    </div>
  );
}

export default CreditCardFront;
