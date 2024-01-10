export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container flex-grow mx-auto px-4">{children}</main>;
}
