import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const useRedirectWhenUnauthenticated = ({
  publicPages,
  isAuthed,
}: {
  publicPages: string[];
  isAuthed: boolean;
}) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const isPublicPage = publicPages.includes(pathname);

  React.useLayoutEffect(() => {
    if (!isAuthed && !isPublicPage) {
      push("/");
    }
  }, [isAuthed]);
};
