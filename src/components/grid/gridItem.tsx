import React, { ComponentProps, ElementType, ReactNode } from "react";
import classes from "./gridItem.module.scss";
import classNames from "classnames";

type GridItemOwnProps<E extends ElementType = ElementType> = {
  children: ReactNode;
  component?: E;
  title?: ReactNode;
};

export type GridItemProps<E extends ElementType> = GridItemOwnProps<E> &
  Omit<ComponentProps<E>, keyof GridItemOwnProps>;

const defaultElement = "div";

function GridItem<E extends ElementType = typeof defaultElement>(
  {
    children,
    component,
    title,
    ...props
  }: GridItemProps<E>,
  ref: React.Ref<GridItemProps<E>>
) {
  const TagName = component || defaultElement;
  const buttonClasses = classNames({
    [classes.grid__item]: true,
    [props.className]: true,
  });
  delete props.className;

  return (
    <TagName className={buttonClasses} {...ref} {...props}>
      {children}
      {title && <div className={classes.grid__item__title}>{title}</div>}
    </TagName>
  );
}

export default React.forwardRef(GridItem);
