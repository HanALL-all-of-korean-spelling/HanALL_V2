import type { NextPage } from "next";
import { useRouter } from "next/router";
import { DetailPage } from "../../src/component/DetailPage/DetailPage";

const Detail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <>{id && <DetailPage id={id} />}</>;
};

export default Detail;
