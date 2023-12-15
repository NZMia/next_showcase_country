'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { WelcomeModal } from '@/components'
import { useAuth } from '@/providers';

export default function Home() {
  const { value } = useAuth();
  const router = useRouter()

  useEffect(() => {
    // Redirect to the /information route if the value is true
    if (value) {
      router.replace('/information');
    }
  }, [value, router]);

  return (
    <main className={styles.main}>
     {!value && <WelcomeModal />}
    </main>
  )
}
