// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/mind-ar/dist/mindar-image-aframe.prod.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
