import Link from 'next/link';


const Footer = () => {
  return (
    <footer className="text-center">
      <nav className="flex justify-center">
        <ul className="flex space-x-12">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/privacy-policy">Privacy Policy</Link></li>
        </ul>
      </nav>
      <p>&copy; 2024 Ideftbuild</p>
    </footer>
  );
}

export default Footer;
