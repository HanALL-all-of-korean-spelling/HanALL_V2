import classNames from "classnames";
import style from "./Title.module.scss";

type titleType = {
  children: React.ReactNode;
  color: string;
  size: string;
  normal?: boolean;
};

export const Title = ({ children, color, size, normal }: titleType) => {
  return (
    <div
      className={classNames(style["Title"], style[color], style[size], {
        [style.normal]: normal,
      })}
    >
      {children}
    </div>
  );
};

Title.defaultProps = {
  color: "pink",
  size: "big",
};

export const SmallText = ({ children }: { children: string }) => {
  return <div className={style.smallText}>{children}</div>;
};
