// app/error.js
'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("حدث خطأ:", error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      textAlign: 'center'
    }}>
      <h2>عذراً، حدث خطأ غير متوقع.</h2>
      <p>{error?.message || "حدث خلل ما."}</p>
      <button
        onClick={reset}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        إعادة المحاولة
      </button>
    </div>
  );
}
