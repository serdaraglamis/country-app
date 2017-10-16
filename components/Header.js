import Link from 'next/link';

const Header = () => (
  <div>
    <nav className="navbar navbar-light bg-faded">
      <Link href="/">
        <a className="navbar-brand">Rest Countries</a>
      </Link>
    </nav>
  </div>
);

export default Header;
