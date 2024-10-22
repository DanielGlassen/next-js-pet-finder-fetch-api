import "../styles/globals.scss";
import type { AppProps } from "next/app";
import SEO from "../../next-seo.config";
import { DefaultSeo } from "next-seo";
import { DehydratedState} from "@tanstack/react-query";
import Layout from "../components/layout/layout";
import Providers from "../context/Providers";
import React from "react";

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Providers dehydratedState={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  );
}

export default MyApp;
