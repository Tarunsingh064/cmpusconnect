// src/app/layout.jsx

import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // ✅ Only once
import { AuthProvider }  from '../Authcontext/Authcontext';


export const metadata = {
  title: 'Campusconnects',
  description: 'Generated by Next.js',
  icons: {
    icon: '/image/cc.jpg', // ✅ Favicon path
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <Header />
        {children}
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
