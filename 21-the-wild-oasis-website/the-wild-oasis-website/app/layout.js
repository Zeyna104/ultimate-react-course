import { Josefin_Sans } from "next/font/google";

import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import { ReservationProvider } from "@/app/_components/ReservationContext";

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome to The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={josefin_sans.className}>
      <body className="bg-primary-950 text-primary-100 antialiased min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <div className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
