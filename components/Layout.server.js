export const Layout = ({ children }) => {
  return (
    <div className="antialiased font-sans text-base leading-normal">
      <main className="py-12 px-6 lg:py-28 lg:px-28">{children}</main>
    </div>
  );
};
