import { CategoryListItem } from './category-list-item';

export const CategoryList = () => {
  return (
    <section className="container mx-auto py-6">
      <div className="flex gap-6 overflow-x-auto scrollbar-none px-4">
        <CategoryListItem
          title="Apparel Stores"
          backgroundColor="rgb(var(--color-neutral-100))"
          imageUrl="/assets/images/clothing.webp"
          url="/category1"
        />
        <CategoryListItem
          title="Apparel Stores"
          backgroundColor="rgb(var(--color-neutral-100))"
          imageUrl="/assets/images/clothing.webp"
          url="/category1"
        />
        <CategoryListItem
          title="Apparel Stores"
          backgroundColor="rgb(var(--color-neutral-100))"
          imageUrl="/assets/images/clothing.webp"
          url="/category1"
        />
        <CategoryListItem
          title="Apparel Stores"
          backgroundColor="rgb(var(--color-neutral-100))"
          imageUrl="/assets/images/clothing.webp"
          url="/category1"
        />
      </div>
    </section>
  );
};
