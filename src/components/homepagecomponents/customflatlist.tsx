import {FlatList} from 'react-native';

interface FlaListProps {
  data: any[];
  uniqueKey?: string;
  renderItem: JSX.Element;
  orientation: boolean;
  showIndicator: boolean;
  seperatorRenderItem: JSX.Element;
}
const CustomFlatList = (props: FlaListProps) => {
  const {
    data,
    uniqueKey,
    renderItem,
    orientation,
    showIndicator,
    seperatorRenderItem,
  } = props;
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={items => renderItem}
      horizontal={orientation}
      showsHorizontalScrollIndicator={showIndicator}
      ItemSeparatorComponent={() => seperatorRenderItem}
    />
  );
};

export default CustomFlatList;
