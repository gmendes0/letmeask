import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

const Home: NextPage = () => {
  const router = useRouter();
  const { signInWithGoogle, user } = useAuth();
  const { t } = useTranslation("common");

  const [roomCode, setRoomCode] = useState<string>();

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();

    router.push("/rooms/create");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode?.trim() === "") return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert(t("room-doesnt-exists-alert"));
      return;
    }

    router.push(`/rooms/${roomCode}`);
  }

  return (
    <>
      <Head>
        <title>{t("home-title")} | Letmeask</title>
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
              alt="Letmeask logo"
              width={150}
              height={70}
            />

            <button className="create-room" onClick={handleCreateRoom}>
              <Image
                src="/assets/images/google-icon.svg"
                alt={t("logo-alt")}
                width={24}
                height={24}
              />
              {t("create-room-google-button")}
            </button>

            <span className="separator">{t("separator")}</span>

            <form onSubmit={handleJoinRoom}>
              <input
                type="text"
                placeholder={t("room-code-input")}
                value={roomCode}
                onChange={event => setRoomCode(event.target.value)}
              />

              <Button type="submit">{t("join-button")}</Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
