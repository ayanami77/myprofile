import { Hono } from "hono";
import { ProfilePresenter } from "./components/profile/ProfilePresenter";
import { Style, css } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Footer } from "./components/Footer";

type Bindings = {
  [key in keyof CloudflareBindings]: CloudflareBindings[key];
};

const app = new Hono<{ Bindings: Bindings }>();

const baseLayout = css`
  position: relative;
  max-width: 700px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 48px 20px 0;
  font-family: "Zen Kaku Gothic New", sans-serif;
  background-color: #FCFAF2;
`;

app.use(
  "*",
  jsxRenderer(({ children }) => {
    return (
      <html lang="ja">
        <head>
          <meta charset="UTF-8" />

          {/* google fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="preconnect" href="https://fonts.googleapis.com" />

          {/* reset css */}
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/destyle.css@3.0.2/destyle.css" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes"
          ></meta>
          <Style />
          <title>profile - taga3</title>
        </head>
        <body class={baseLayout}>
          {children}
          <Footer />
        </body>
      </html>
    );
  }),
);

app.get("/", (c) => {
  return c.render(<ProfilePresenter />);
});

export default app;
