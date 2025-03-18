function Quote({ quote, author: { name, position } }) {
  return (
    <div className="wrapper py-fluid-lg prose">
      <p className="lead max-w-p-lg">{quote}</p>
      <p className="text-xs">
        {name} - <span className="opacity-50">{position}</span>
      </p>
    </div>
  );
}
export default Quote;
