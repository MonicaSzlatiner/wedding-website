export default function StandaloneLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main id="main-content" className="flex-1" role="main">
      {children}
    </main>
  );
}
