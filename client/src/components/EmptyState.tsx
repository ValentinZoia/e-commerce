interface EmptyStateProps {
    title: string;
  }
  
  export const EmptyState = ({ title }: EmptyStateProps) => {
    return (
      <div className="w-full text-center py-8 text-gray-500">
        {title}
      </div>
    );
  };