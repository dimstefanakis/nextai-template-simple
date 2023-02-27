import "../styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../types_db";

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      "*": {
        boxSizing: "border-box",
        // border: '1px solid transparent',
      },
    }),
  },
});

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  return (
    <ChakraProvider theme={theme}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </ChakraProvider>
  );
}
