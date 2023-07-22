import { forwardRef } from "react";
import styles from "./input.module.scss";

function Input({ value, onChange, ...outrosprops }, ref) {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      {...outrosprops}
      className={styles.input}
    />
  );
}

export default forwardRef(Input);
