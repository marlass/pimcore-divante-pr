export default ({ children }) => (
  <main>
    {children}
    <style jsx global>
    {`
      * {
        box-sizing: border-box;
      }
    `}
    </style>
    <style jsx>
      {`
        main {
          font-family: "Avenir", Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-align: left;
          color: #2c3e50;
          margin-top: 60px;
        }
      `}
    </style>
  </main>
)
