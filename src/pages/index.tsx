import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";

import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";

const Home: NextPage = () => {
  const router = useRouter();
  const { signInWithGoogle, user } = useAuth();

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();

    router.push("/rooms/create");
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

            <form>
              <input type="text" placeholder="Digite o código da sala" />

              <Button type="submit">Entrar na sala</Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
