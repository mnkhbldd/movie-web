import { useRouter, useParams } from "next/navigation";

const SimilarPage = () => {
  const router = useRouter();
  const params = useParams();

  const category = params.category;
  const page = params.page;

  // Use the category and page parameters to fetch data or render content

  return (
    <div>
      <h1>Similar movies for {category}</h1>
      <p>Page {page}</p>
    </div>
  );
};

export default SimilarPage;
