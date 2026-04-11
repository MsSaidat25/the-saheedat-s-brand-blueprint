const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-sm text-foreground">
          The <span className="text-primary">Saheedat</span>
        </span>
        <span className="font-sans text-xs text-muted-foreground">
          © {new Date().getFullYear()} Saheedat Abbas. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
