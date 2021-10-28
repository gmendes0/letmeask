import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";
import RoomCode from "../../components/RoomCode";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

type Question = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  is_highlighted: boolean;
  is_answered: boolean;
};

const Room: NextPage = () => {
  const { t } = useTranslation("common");
  const route = useRouter();
  const { user } = useAuth();

  const [newQuestion, setNewQuestion] = useState<string>();

  const { id: roomId } = route.query;

  if (!roomId) return <>{t("room-not-found")}</>;

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (!newQuestion?.trim()) return;

    if (!user) throw new Error(t("must-be-logged-in"));

    const question: Question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      is_highlighted: false,
      is_answered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  }

  return (
    <>
      <Head>
        <title>{t("room")} | Letmeask</title>
      </Head>

      <div id="page-room">
        <header>
          <div className="content">
            <Image
              src="/assets/images/logo.svg"
              alt={t("app-logo-alt")}
              width={100}
              height={45}
              className="logo"
            />
            <RoomCode code={roomId as string} />
          </div>
        </header>

        <main>
          <div className="room-title">
            <h1>{t("room")} React</h1>
            <span>4 {t("questions")}</span>
          </div>

          <form onSubmit={handleSendQuestion}>
            <textarea
              placeholder={t("question-textarea")}
              value={newQuestion}
              onChange={event => setNewQuestion(event.target.value)}
            />

            <div className="form-footer">
              {user ? (
                <div className="user-info">
                  <Image
                    src={user.avatar}
                    alt={t("user-avatar-alt", { name: user.name })}
                    width={32}
                    height={32}
                  />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>
                  {t("to-send-question")}, <button>{t("do-login")}</button>.
                </span>
              )}
              <Button type="submit" disabled={!user}>
                {t("send-question")}
              </Button>
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
