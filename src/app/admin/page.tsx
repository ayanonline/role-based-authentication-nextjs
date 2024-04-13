"use client";

import Protected from "@/components/protected";

function AdminPage() {
  return (
    <div>
      <h1 className="text-center">Inside Admin page</h1>
    </div>
  );
}

export default Protected(AdminPage);
