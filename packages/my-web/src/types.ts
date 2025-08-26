export type ServerComponentProps<T extends any> = T & {
  params: Promise<{ lang: string }>;
};
