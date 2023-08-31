import { useParams } from "react-router-dom";

export default function Location() {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <p>Location {id}</p>
    </>
  );
}
