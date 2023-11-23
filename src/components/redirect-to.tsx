import { useRouter } from "next/navigation";
import React from "react";

export default function RedirectTo({ path }: { path: string }) {
  const { push } = useRouter();

  React.useEffect(() => {
    if (!path) {
      throw new Error(
        "Please include a valid path to redirect to in <RedirectTo />"
      );
    }
    push(path, { scroll: false });
  }, [path]);

  return null;
}
