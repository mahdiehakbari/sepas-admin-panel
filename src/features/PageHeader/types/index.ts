export interface IPageHeaderProps {
  titleKey: string;
  onFilterClick: () => void;
  handleRemoveFilter: () => void;
  filterTextKey?: string;
  remove: boolean;
}
