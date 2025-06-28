import "./globals.css";
import { IBM_Plex_Mono } from 'next/font/google';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-ibm-plex-mono',
});

export const metadata = {
  title: "/home/armaan",
  description: "armaan priyadarshan's website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={ibmPlexMono.className}
      >
        {children}
      </body>
    </html>
  );
}