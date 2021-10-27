import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";

import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

const Home: NextPage = () => {
  const router = useRouter();
  const { signInWithGoogle, user } = useAuth();
  ("");

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
      alert("Room doesn't exists.");
      return;
    }

    router.push(`/rooms/${roomCode}`);
  }

  return (
    <>
      <Head>
        <title>Home | Letmeask</title>
      </Head>

      <div id="page-auth">
        <aside>
          <Image
            src="/assets/images/illustration.svg"
            alt="Illustrção da applicação"
            width={640}
            height={640}
          />

          <strong>Crie salas de Q&A ao vivo</strong>
          <p>Tire dúvidas da sua audiência em tempo real</p>
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
                alt="Logo do Google"
                width={24}
                height={24}
              />
              Crie sua sala com o Google
            </button>

            <span className="separator">Ou entre em uma sala</span>

            <form onSubmit={handleJoinRoom}>
              <input
                type="text"
                placeholder="Digite o código da sala"
                value={roomCode}
                onChange={event => setRoomCode(event.target.value)}
              />

              <Button type="submit">Entrar na sala</Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
