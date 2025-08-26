import { cn } from "@tekminewe/mint-ui/utils";
import styles from "./css/blog.module.css";
import { useFormContext } from "@tekminewe/mint-ui/form";

export const PostFormEditor0 = () => {
  const { watch } = useFormContext();
  const content = watch("content");
  return (
    <div
      className={cn(styles.blogDeprecated, "max-w-2xl")}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};
