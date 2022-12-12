import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Login';
import PlaylistForm from '../components/PlaylistForm'
import styles from '../styles/Home.module.css'
import { isAuthenticated } from '../util/isAuthenticated';

export default function Home({}) {
  const session = useSession();
  console.log(session);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PlaylistForm />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!(await isAuthenticated(session))) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {props: {}};
};
