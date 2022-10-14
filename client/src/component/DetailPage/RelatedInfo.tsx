import Link from "next/link";
import { IRelated } from "../../../types";
import { Button } from "../common/Button/Button";
import { Title } from "../common/Title/Title";
import style from "./DetailPage.module.scss";

export const RelatedInfo = ({ related }: { related: IRelated }) => {
  return (
    <div className={style.RelatedInfo}>
      {related?.id && (
        <Link href="/detail/[id]" as={`/detail/${related?.id}`} passHref>
          <Button color="white" outline shadow>
            <div>친구</div>
            <Title size="small" color="blue">
              {related.title}
            </Title>
          </Button>
        </Link>
      )}
    </div>
  );
};
