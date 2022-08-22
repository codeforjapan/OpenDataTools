import { ContentLayout } from '../../../components/Layout';

export const DataCategory = () => {
  return (
    <ContentLayout title="Profile">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details of the user.</p>
        </div>
      </div>
    </ContentLayout>
  );
};
