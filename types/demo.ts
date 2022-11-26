export type DemoData = {
  title: string;
  categories: string[];
  description: string;
};

export type DemoFile = {
  slug: string;
  data: DemoData;
};
