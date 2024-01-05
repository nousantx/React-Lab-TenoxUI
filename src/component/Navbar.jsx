import Styler from "../Style";

export default function Navbar() {
  Styler();
  return (
    <header className="post-fixed t-0 w-full p-2rem pv-1rem fx-ctr jc-[sb] bg-white">
      <h1 className="logo">TenoxUI</h1>
      <nav>
        <ul className="fx-ctr gap-1rem">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
