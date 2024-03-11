import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Theme from "./theme-provider";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/components/Auth/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <Theme>
          <AuthProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-var(--nav-h))] flex flex-col justify-center">
              {children}
              <ToastContainer theme="light" transition={Flip} />
            </main>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
