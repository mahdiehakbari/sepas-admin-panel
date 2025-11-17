export interface IContentStateWrapperProps {
  loading: boolean;
  isEmpty: boolean;
  loadingText?: string;
  emptyText?: string;
  children: React.ReactNode;
}
