import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import store from '../store/store';
import { DogProvider } from './DogContext';

const Providers: React.FC<{ children: React.ReactNode; dehydratedState: any }> = ({ children, dehydratedState }) => {
  const [queryClient] = useState(() =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <Provider store={store}>
          <ThemeProvider enableSystem attribute="class">
            <DogProvider>
              {children}
            </DogProvider>
          </ThemeProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default Providers;
