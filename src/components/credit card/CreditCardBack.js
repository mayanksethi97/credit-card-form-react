import classes from "./CreditCard.module.css";

function CreditCardBack(props) {
  return (
    <div
      className={`${classes.card} ${classes.back} d-flex justify-content-between flex-column align-items-center`}
      style={{ paddingLeft: 0, paddingRight: 0, backgroundImage: `url('${props.skin}')` }}>
      <div className={` ${classes["logo-container"]} ${classes.stripe}`}></div>
      <div id="card-number" class="form-control" style={{ width: "90%" }}>
        <h5 className={classes.cvv}>{props.cvv}</h5>
      </div>
      <div
        className={`d-flex justify-content-end ${classes["logo-container"]}`}
        style={{ width: "90%" }}>
        <img src={props.cardType.image} alt="logo" />
      </div>
    </div>
  );
}

export default CreditCardBack;
