import { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable, IDataTableColumn } from './data-table';
import { Button } from '../button';

type BlogData = {
  id: number;
  title: string;
  view: number;
  createdAt: string;
};

const meta = {
  title: 'Common / DataTable',
  component: DataTable,
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns: IDataTableColumn<BlogData>[] = [
  {
    label: '#',
    dataKey: undefined,
    renderCell: ({ rowIndex }) => {
      return rowIndex + 1;
    },
  },
  {
    label: 'Title',
    dataKey: 'title',
  },
  {
    label: 'Views',
    dataKey: 'view',
  },
  {
    label: 'Created At',
    dataKey: 'createdAt',
    formatValueForExport: ({ value }) => {
      return new Date(value).toLocaleString();
    },
    renderCell: ({ value }) => {
      return new Date(value).toLocaleString();
    },
  },
  {
    label: 'Actions',
    dataKey: undefined,
    renderCell: () => {
      return <Button>Edit</Button>;
    },
  },
];

// Generate more data for scrolling demonstration
const generateLargeDataset = (count: number): BlogData[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Blog Post ${i + 1} - ${
      Math.random() > 0.5
        ? 'This is a very long title that demonstrates horizontal scrolling capabilities'
        : 'Short title'
    }`,
    view: Math.floor(Math.random() * 10000),
    createdAt: new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
    ).toISOString(),
  }));
};

const largeDataset = generateLargeDataset(50);

export const AllVariants: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    columns,
    data: [],
  },
  render: () => (
    <div className="space-y-8">
      {/* Basic Table */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Table</h3>
        <DataTable
          columns={columns}
          data={[
            {
              id: 1,
              title: 'Hello World',
              view: 100,
              createdAt: '2021-10-01T12:00:00',
            },
            {
              id: 2,
              title: 'Hello World 2',
              view: 200,
              createdAt: '2021-10-02T12:00:00',
            },
          ]}
        />
      </div>

      {/* Loading State */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Loading State</h3>
        <DataTable columns={columns} data={[]} isLoading={true} />
      </div>

      {/* Empty State */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Empty State</h3>
        <DataTable columns={columns} data={[]} />
      </div>

      {/* With Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          With Actions (Add, Export, Filter)
        </h3>
        <DataTable
          columns={columns}
          data={largeDataset.slice(0, 5)}
          showAddButton={true}
          addButtonLabel="Add Blog"
          allowExport={true}
          exportDataRequest={() => Promise.resolve(largeDataset)}
          filters={{
            columns: [
              {
                label: 'Title',
                key: 'title',
                type: 'select',
                options: [
                  { label: 'Hello World', value: 'Hello World' },
                  { label: 'Hello World 2', value: 'Hello World 2' },
                ],
              },
              {
                label: 'Created At',
                key: 'createdAt',
                type: 'date',
              },
            ],
          }}
        />
      </div>

      {/* Horizontal Scrolling */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Horizontal Scrolling (Long Content)
        </h3>
        <DataTable
          columns={[
            ...columns,
            {
              label: 'Very Long Column Name That Causes Overflow',
              dataKey: 'title',
            },
            {
              label: 'Another Long Column',
              dataKey: 'view',
            },
            {
              label: 'Extra Column 1',
              dataKey: 'id',
            },
            {
              label: 'Extra Column 2',
              dataKey: 'createdAt',
            },
          ]}
          data={largeDataset.slice(0, 3)}
        />
      </div>

      {/* Vertical Scrolling with Fixed Height */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Vertical Scrolling (Fixed Height 400px)
        </h3>
        <DataTable
          columns={columns}
          data={largeDataset}
          maxHeight="400px"
          stickyHeader={true}
        />
      </div>

      {/* Both Horizontal and Vertical Scrolling */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Both Scrolling (Fixed Height + Wide Columns)
        </h3>
        <DataTable
          columns={[
            ...columns,
            {
              label: 'Very Long Column Name That Causes Overflow',
              dataKey: 'title',
            },
            {
              label: 'Another Long Column With More Text',
              dataKey: 'view',
            },
            {
              label: 'Extra Wide Column 1',
              dataKey: 'id',
            },
            {
              label: 'Extra Wide Column 2',
              dataKey: 'createdAt',
            },
            {
              label: 'Final Wide Column',
              dataKey: 'title',
            },
          ]}
          data={largeDataset}
          maxHeight="300px"
          stickyHeader={true}
        />
      </div>

      {/* Surface Variant with Scrolling */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Surface Variant with Scrolling
        </h3>
        <DataTable
          columns={columns}
          data={largeDataset.slice(0, 20)}
          variant="surface"
          maxHeight="350px"
          stickyHeader={true}
        />
      </div>
    </div>
  ),
};
