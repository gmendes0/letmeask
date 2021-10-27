import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

const NewRoom: NextPage = () => {
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
        <title>Criar sala | Letmeask</title>
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

            <h2>Crie uma nova sala</h2>

            <form onSubmit={handleCreateRoom}>
              <input
                type="text"
                placeholder="Nome da sala"
                value={name}
                onChange={event => setName(event.target.value)}
              />

              <Button type="submit">Criar sala</Button>
              <p>
                Quer entrar em uma sala existente?{" "}
                <Link href="/">Clique aqui</Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default NewRoom;
