import Image from "next/image";
import { useTranslation } from "react-i18next";

import styles from "../styles/modules/RoomCode.module.scss";

type RoomCodeProps = {
  code: string;
};

export default function RoomCode(props: RoomCodeProps) {
  const { t } = useTranslation("common");

  function handleCopyCodeToClickboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button
      className={styles["room-code"]}
      onClick={handleCopyCodeToClickboard}
    >
      <div>
        <Image
          src="/assets/images/copy.svg"
          alt={t("copy-icon-alt")}
          width={20}
          height={20}
          className={styles["copy-icon"]}
        />
      </div>
      <span>
        <span className={styles["room-span"]}>{t("room")}</span> #{props.code}
      </span>
    </button>
  );
}
