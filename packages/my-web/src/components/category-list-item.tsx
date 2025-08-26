import { Text } from "@tekminewe/mint-ui/typography";
import Image from "next/image";

export const CategoryListItem = ({
  backgroundColor,
  imageUrl,
  url,
  title,
}: {
  title: string;
  backgroundColor: string;
  imageUrl: string;
  url: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="rounded-6 w-[150px] h-[150px] flex items-center justify-center"
        style={{
          backgroundColor,
        }}
      >
        <Image src={imageUrl} alt={title} width={100} height={100} />
      </div>
      <Text>{title}</Text>
    </div>
  );
};
