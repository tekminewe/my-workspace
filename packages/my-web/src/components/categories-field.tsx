'use client';

import { Dictionary } from '@/dictionaries';
import { useFormContext } from 'react-hook-form';
import { ControlledSelect } from '@tekminewe/mint-ui/select';

interface AdvertiserFormState {
  id?: string;
  statusId: boolean;
  slug: string;
  metadatas?: Array<{
    languageId: string;
    name: string;
  }>;
  commissions: Array<{
    id: string;
    providerId: string;
    statusId: boolean;
    commissionRows: Array<{
      id: string;
      providerReferenceId: string;
      commission: number;
      typeId: string;
      statusId: boolean;
      metadatas?: Array<{
        languageId: string;
        name: string;
      }>;
    }>;
  }>;
  providerReferences?: Array<{
    providerId: string;
    providerReferenceId: string;
  }>;
  categories?: string[];
}

interface CategoriesFieldProps {
  categories: Array<{ id: string; name: string }>;
  name: string;
  dictionary: Dictionary['admin']['advertiser']['manage'];
}

export const CategoriesField = ({
  categories,
  name,
  dictionary,
}: CategoriesFieldProps) => {
  return (
    <ControlledSelect
      label={dictionary.categoriesLabel}
      placeholder={dictionary.categoriesPlaceholder}
      multiple
      name="categories"
      options={categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))}
    />
  );
};
