import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 rounded-3xl border border-base-300/70 bg-base-200/70 py-10">
      <div className="grid gap-8 px-4 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-primary">BookBloom</h3>
          <p className="mt-2 text-sm text-base-content/70">
            Discover your next favorite story, borrow it seamlessly, and keep your reading life organized.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Social Media</h3>
          <div className="mt-2 flex flex-col gap-2 text-sm text-base-content/70">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="link link-hover">
              Instagram
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="link link-hover">
              X / Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="link link-hover">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="link link-hover">
              GitHub
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="mt-2 text-sm text-base-content/70">hello@bookbloom.com</p>
          <p className="text-sm text-base-content/70">+880 1712 345678</p>
          <p className="mt-2 text-sm text-base-content/70">Dhaka, Bangladesh</p>
        </div>
      </div>
      <div className="mt-8 border-t border-base-300/50 pt-4 text-center text-xs text-base-content/60">
        © {new Date().getFullYear()} BookBloom. Built for category-A8-Mango assignment.
      </div>
    </footer>
  );
}
