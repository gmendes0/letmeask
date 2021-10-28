import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";

const Room: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>Sala | Letmeask</title>
      </Head>

      <div id="page-room">
        <header>
          <div className="content">
            <Image
              src="/assets/images/logo.svg"
              alt={t("app-logo-alt")}
              width={100}
              height={45}
            />
            <div>codigo</div>
          </div>
        </header>

        <main className="content">
          <div className="room-title">
            <h1>{t("room")} React</h1>
            <span>4 {t("questions")}</span>
          </div>

          <form>
            <textarea placeholder={t("question-textarea")} />

            <div className="form-footer">
              <span>
                {t("to-send-question")}, <button>{t("do-login")}</button>.
              </span>
              <Button type="submit">{t("send-question")}</Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default Room;

export const getServerSideProps = async (ctx: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(ctx.locale, ["common"])),
  },
});
