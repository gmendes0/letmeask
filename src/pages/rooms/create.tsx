import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

const NewRoom: NextPage = () => {
  const { t } = useTranslation("common");

  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState<string>();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (name?.trim() === "") return;

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: name,
      author_id: user?.id,
    });

    router.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <>
      <Head>
        <title>{t("create-room-title")} | Letmeask</title>
      </Head>

      <div id="page-auth">
        <aside>
          <Image
            src="/assets/images/illustration.svg"
            alt={t("illustration-alt")}
            width={640}
            height={640}
          />

          <strong>{t("app-h1")}</strong>
          <p>{t("app-h2")}</p>
        </aside>

        <main>
          <div className="main-content">
            <Image
              src="/assets/images/logo.svg"
              alt={t("logo-alt")}
              width={150}
              height={70}
            />

            <h2>{t("create-room-text")}</h2>

            <form onSubmit={handleCreateRoom}>
              <input
                type="text"
                placeholder={t("room-name-input")}
                value={name}
                onChange={event => setName(event.target.value)}
              />

              <Button type="submit">{t("create-room-button")}</Button>
              <p>
                {t("join-existent-room-text")}{" "}
                <Link href="/">{t("click-here")}</Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default NewRoom;

export const getStaticProps = async (ctx: { locale: string }) => ({
  props: { ...(await serverSideTranslations(ctx.locale, ["common"])) },
});
