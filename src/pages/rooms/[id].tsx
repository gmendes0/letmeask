import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

const Room: NextPage = props => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sala | Letmeask</title>
      </Head>
    </>
  );
};

export default Room;
