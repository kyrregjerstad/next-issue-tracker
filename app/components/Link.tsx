import React from "react";
import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import { ComponentProps } from "react";
import clsx from "clsx";

type NextLinkProps = ComponentProps<typeof NextLink>;

interface Props extends NextLinkProps {
  children: React.ReactNode;
  className?: string;
}

const Link = ({ children, className, ...nextLinkProps }: Props) => {
  const mergedClasses = clsx("default-link-styles", className); // Merge default styles with passed className

  return (
    <>
      <NextLink {...nextLinkProps} passHref legacyBehavior>
        <RadixLink className={mergedClasses}>{children}</RadixLink>
      </NextLink>
    </>
  );
};

export default Link;
