import { ButtonHTMLAttributes } from "react";

import styles from "../styles/modules/Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  return <button className={styles.button} {...props} />;
}
