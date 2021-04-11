import Head from 'next/head';
import type QrReader from 'react-qr-reader';
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import styles from './index.module.scss';
import Model from '../components/Model';
import Loading from '../components/Loading';

const ReactQrReader = dynamic<QrReader.props>(() => import('react-qr-reader'), {
  ssr: false,
});

export default function Home() {
  const [url, setUrl] = useState<string | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      setUrl(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div>
      <Head>
        <title>AR Model Viewer</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          body {
            margin: 0;
          }
        `}</style>
      </Head>

      <main className={styles.Main}>
        <ReactQrReader
          className={styles.QrReader}
          delay={300}
          onError={handleError}
          onScan={handleScan}
        />
        <div className={styles.Canvas}>
          <Canvas>
            {/* <OrbitControls /> */}
            <directionalLight intensity={0.5} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.9} />
            <Suspense fallback={<Loading />}>
              {url && <Model url={url} />}
            </Suspense>
          </Canvas>
          {url}
        </div>
      </main>
    </div>
  );
}
