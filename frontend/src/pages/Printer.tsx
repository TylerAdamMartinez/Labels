import { useParams } from "react-router-dom";

export default function Printer() {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <p>Printer { id }</p>
    </>
  );
}

