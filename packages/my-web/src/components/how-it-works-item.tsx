import Image from 'next/image';
export const HowItWorksItem = ({
  imageUrl,
  title,
  description,
  color,
  backgroundColor,
}: {
  imageUrl: string;
  title: string;
  description: string;
  color: string;
  backgroundColor: string;
}) => {
  return (
    <div
      className="flex flex-col items-center border-2 rounded-6 px-8 py-6 w-[300px]"
      style={{
        borderColor: backgroundColor,
      }}
    >
      <div
        className="w-[120px] h-[120px] rounded-full flex items-center justify-center mb-6"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <Image src={imageUrl} alt={title} width={100} height={100} />
      </div>
      <p
        className="font-semibold mb-2 text-center"
        style={{
          color: color,
        }}
      >
        {title}
      </p>
      <p className="text-center text-neutral-700 caption">{description}</p>
    </div>
  );
};
