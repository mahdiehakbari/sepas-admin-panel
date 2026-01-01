'use client';

import { useAuthTimeout } from './hooks/useAuthTimeout';

export function AuthChecker() {
  useAuthTimeout();
  return null;
}
