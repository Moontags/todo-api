import "./globals.css";

export const metadata = {
  title: "To-Do List",
  description: "Next.js tehtävälista",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}
