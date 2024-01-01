import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import React from "react";
import { RecoilRoot } from "recoil";
import Slider from "react-slick";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from './components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

function App() {
  return (
    <div className='h-screen'>
      <RecoilRoot>
      <Header/>
      <QueryClientProvider client={queryClient}>
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Footer/>
      </RecoilRoot>
    </div>
  );
}

export default App;
