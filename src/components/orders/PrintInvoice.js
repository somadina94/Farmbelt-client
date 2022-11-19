import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import classes from "./PrintInvoice.module.css";
import Invoice from "./Invoice";

const PrintInvoice = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={classes.printDiv}>
      <div style={{ display: "none" }}>
        <Invoice order={props.order} ref={componentRef} />
      </div>
      <button className={classes.button} onClick={handlePrint}>
        Print Invoice
      </button>
    </div>
  );
};

export default PrintInvoice;
