import Head from 'next/head'
import { useRef } from 'react'
import styles from '../styles/Home.module.scss'
import Header from '../components/HeaderComponent/Header'
import Create from '../public/asserts/images/create.svg'
import Join from '../public/asserts/images/join.svg'
import { useRouter } from 'next/router';

export default function Home() {
  const containerRef = useRef(null);
  const router = useRouter();
  const handleClick = (e) =>{
    if(e.currentTarget.id === 'create'){
      containerRef.current.classList.add(styles.slide_left);
      setTimeout(() => router.push('/create'), 500)
    }else{
      containerRef.current.classList.add(styles.slide_right);
      setTimeout(() => router.push('/join'), 500)
    }
  }

  return (
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header/>
        <main className="d-flex" ref={containerRef}>
            <div 
              id="join" 
              className={`d-flex justify-content-center align-items-center ${styles.box} ${styles.purp}`} 
              onClick={handleClick}
            > 
              <div className={styles.box_item}>
                <Join width={200} height={160}/>
                Join existing room
              </div>
            </div>
            <div 
              id="create" 
              className={`d-flex justify-content-center align-items-center ${styles.box}`} 
              onClick={handleClick}
            >
              <div className={styles.box_item}>
                <Create width={200} height={160}/>
                Create new room
              </div>        
            </div>
        </main>
      </div>
  )
}
