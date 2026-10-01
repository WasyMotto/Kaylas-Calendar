import "./globals.css";

export const metadata = {
  title: "Whimsical Timekeeper",
  description: "A soft, pink, whimsical time tracking app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-pinkBackground">
        <header className="header-gradient p-6 shadow-soft rounded-b-soft">
          <h1>Kayla&apos;s Calendar</h1>
        </header>

        <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-soft shadow-soft">
          {children}
        </main>
      </body>
    </html>
  );
}
