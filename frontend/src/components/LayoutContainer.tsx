interface LayoutContainerProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  dynamicProps?: { [key: string]: string };
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({
  children,
  dynamicProps,
  ...rest
}) => {
  return (
    <>
      <section
        {...rest}
        {...dynamicProps}
        className={`grid min-h-[100dvh] grid-rows-[auto_1fr_auto] ${rest.className}`}
      >
        {children}
      </section>
    </>
  );
};

export default LayoutContainer;