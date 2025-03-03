import Modules from "@/components/shared/modules";

export interface PageProps {
  data: any;
}

export function HomePage({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { modules, title } = data?.home ?? {};

  return (
    <>
      <h1 className="sr-only">{title}</h1>
      {/* {modules && <Modules modules={modules} page={data} />} */}
    </>
  );
}

export default HomePage;
