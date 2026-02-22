import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Online | I H Professionals & Co.",
  description:
    "Book a consultation with I H Professionals & Co. Select a service and schedule your appointment online.",
};

export default function BookOnlineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
