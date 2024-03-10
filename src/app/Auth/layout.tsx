import React from "react";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container min-h-[calc(100vh-var(--nav-h))]  flex items-center justify-center">
      {children}
    </section>
  );
}

export default Layout;
