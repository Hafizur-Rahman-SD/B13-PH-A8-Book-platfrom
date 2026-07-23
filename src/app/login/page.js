import { Suspense } from 'react';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-10 text-center text-base-content/70">Loading login form...</div>}>
      <LoginForm />
    </Suspense>
  );
}
