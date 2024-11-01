import { View, Text, StyleSheet } from 'react-native';

export function HeaderNavbar() {
  const showType = ['음악', '연극', '전시', '무용'];
  return (
    <View style={styles.navbarContainer}>
      {showType.map((title) => (
        <NavbarItem key={title} title={title} />
      ))}
    </View>
  );
}

interface INavbarItemProps {
  title: string;
}
function NavbarItem({ title }: INavbarItemProps) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: 'white',
  },

  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    flex: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 19,
  },
});
