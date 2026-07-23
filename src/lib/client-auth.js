'use client';

import { createAuthClient } from 'better-auth/react';

/** Same-origin requests — works on any port (3000, 3001, production). */
export const authClient = createAuthClient({
  fetchOptions: {
    credentials: 'include',
  },
});
