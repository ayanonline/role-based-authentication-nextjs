"use client";

import Protected from "@/components/protected";

function Home() {
  return (
    <main>
      <h1 className="text-center">Inside Home page</h1>
    </main>
  );
}

export default Protected(Home);
