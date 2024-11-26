const PageHeader = (props) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 max-w-full bg-cover bg-top mx-auto text-center mb-12 h-[30vh] lg:h-[50vh] flex flex-col items-center justify-center flex-nowrap">
      <h1 className="text-4xl md:text-5xl font-bold text-white">
        {props.heading}
      </h1>
      <p className="text-lg text-white mt-4">{props.subheading}</p>
    </div>
  );
};

export default PageHeader;
