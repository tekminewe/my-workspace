import { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './search-input';
import { SearchDialog } from './search-dialog';
import { SearchRoot } from './search-root';
import { SearchResultList } from './search-result-list';
import { SearchResultListItem } from './search-result-list-item';
import { useCallback, useEffect, useState } from 'react';

const meta = {
  title: 'Common / Search Input',
  component: SearchRoot,
  subcomponents: {
    SearchDialog: SearchDialog as React.ComponentType<unknown>,
    SearchInput: SearchInput as React.ComponentType<unknown>,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => {
    const [ref1, setRef1] = useState<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<string[]>([]);

    const callbackRef1 = useCallback((node: HTMLDivElement) => {
      if (node) setRef1(node);
    }, []);

    useEffect(() => {
      if (query) {
        setLoading(true);
        setTimeout(() => {
          setResult(
            [...Array(10).keys()].map((i) => `${query} result ${i + 1}`),
          );
          setLoading(false);
        }, 1500);
      }
    }, [query]);

    return (
      <div className="space-y-8 p-6">
        {/* Basic Search Input */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Basic Search Input</h3>
          <div ref={callbackRef1} className="max-w-md">
            <SearchRoot>
              <SearchInput />
              <SearchDialog
                container={ref1}
                searchInputPlaceholder="Search for products, stores, deals..."
                onQueryChange={(query) => {
                  setQuery(query);
                }}
              >
                <SearchResultList isLoading={loading}>
                  {result.map((item, index) => (
                    <SearchResultListItem
                      key={item}
                      imageUrl={
                        index % 3 === 0
                          ? '/assets/placeholder.png'
                          : index % 3 === 1
                          ? '/assets/placeholder-portrait.png'
                          : '/assets/placeholder-landscape.png'
                      }
                      title={item}
                      subtitle={`Description for ${item}`}
                    />
                  ))}
                </SearchResultList>
              </SearchDialog>
            </SearchRoot>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="space-y-4 mt-8 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Usage Notes</h3>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
            <p>
              • SearchRoot manages the overall search state and dialog
              visibility
            </p>
            <p>
              • SearchInput triggers the search dialog when clicked or focused
            </p>
            <p>• SearchDialog contains the search interface and results</p>
            <p>• SearchResultList handles loading states and result display</p>
            <p>
              • SearchResultListItem supports images, titles, and rich subtitles
            </p>
            <p>
              • All components support both light and dark themes automatically
            </p>
          </div>
        </div>
      </div>
    );
  },
};

export const SearchResults: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) setRef(node);
    }, []);

    return (
      <div className="space-y-6 p-6">
        <h3 className="text-lg font-semibold">
          Search Results - Various Content Types
        </h3>
        <div ref={callbackRef} className="max-w-md">
          <SearchRoot open>
            <SearchDialog container={ref}>
              <SearchResultList>
                <SearchResultListItem
                  title="Apple iPhone 15 Pro"
                  subtitle="Latest flagship smartphone with titanium design"
                  imageUrl="/assets/placeholder.png"
                />
                <SearchResultListItem
                  title="Samsung Galaxy S24 Ultra"
                  subtitle={
                    <div>
                      Premium Android device with <strong>S Pen</strong>{' '}
                      support
                    </div>
                  }
                  imageUrl="/assets/placeholder-portrait.png"
                />
                <SearchResultListItem
                  title="Google Pixel 8 Pro"
                  subtitle="AI-powered photography and pure Android experience"
                />
                <SearchResultListItem
                  title="MacBook Pro M3"
                  subtitle="Professional laptop for developers and creators"
                  imageUrl="/assets/placeholder-landscape.png"
                />
                <SearchResultListItem
                  title="iPad Air"
                  subtitle="Versatile tablet for work and entertainment"
                />
              </SearchResultList>
            </SearchDialog>
          </SearchRoot>
        </div>
      </div>
    );
  },
};

export const LoadingState: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) setRef(node);
    }, []);

    return (
      <div className="space-y-6 p-6">
        <h3 className="text-lg font-semibold">Loading State</h3>
        <div ref={callbackRef} className="max-w-md">
          <SearchRoot open>
            <SearchDialog container={ref} searchInputPlaceholder="Searching...">
              <SearchResultList isLoading>
                <SearchResultListItem
                  title="Apple MacBook Pro"
                  subtitle="Professional laptop with M3 chip"
                  imageUrl="/assets/placeholder.png"
                />
                <SearchResultListItem
                  title="Dell XPS 13"
                  subtitle="Premium ultrabook for productivity"
                  imageUrl="/assets/placeholder-portrait.png"
                />
                <SearchResultListItem
                  title="Lenovo ThinkPad X1"
                  subtitle="Business laptop with exceptional keyboard"
                />
              </SearchResultList>
            </SearchDialog>
          </SearchRoot>
        </div>
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) setRef(node);
    }, []);

    return (
      <div className="space-y-6 p-6">
        <h3 className="text-lg font-semibold">Empty State</h3>
        <div ref={callbackRef} className="max-w-md">
          <SearchRoot open>
            <SearchDialog
              container={ref}
              searchInputPlaceholder="No results found"
            >
              <SearchResultList>{/* Empty results */}</SearchResultList>
            </SearchDialog>
          </SearchRoot>
        </div>
      </div>
    );
  },
};
