import Thumbhash from "./components/thumbhash";


export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
      <Thumbhash
        hash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
        width={300}
        height={400}
      />
      </body>
    </>
  );
};
