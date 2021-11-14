import styles from "../styles/Home.module.css";
 
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/resident",
      permanent: true,
    },
  };
}

export default function Home() {
  return (
    <div className={styles.container}>
      <p>You're on index... You are not supposed to be here &gt;:(</p>
    </div>
  );
}
