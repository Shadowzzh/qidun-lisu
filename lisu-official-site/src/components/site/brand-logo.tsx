import Image from "next/image";
import logoMark from "@/assets/brand/lisu-logo-mark.png";

type BrandLogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
};

export function BrandLogo({ className, markClassName, textClassName }: BrandLogoProps) {
  const wrapperClassName = className ?? "flex items-center gap-3";
  const imageClassName = markClassName ?? "h-9 w-9 rounded-lg";
  const labelClassName = textClassName ?? "text-base font-semibold text-slate-900 md:text-lg";

  return (
    <span className={wrapperClassName}>
      <Image alt="" aria-hidden="true" className={imageClassName} priority src={logoMark} />
      <span className={labelClassName}>北京骊甦科技</span>
    </span>
  );
}
