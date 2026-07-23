import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'BookBloom | Online Book Borrowing Platform',
  description: 'Borrow your favorite books online with a smooth and modern library experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night">
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-base-100 text-base-content">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
