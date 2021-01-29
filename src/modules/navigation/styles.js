import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  backActivity: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: -10,
  },
  whiteLabel: {
    color: colors.white,
  },
  nameArea: {
    paddingHorizontal: 10,
    flex: 1,
  },
  addButton: {
    alignItems: 'center',
  },
  shareIcon: {
    marginRight: 10,
  },
  shareButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 8,
  },
  profilePart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 6,
  },
  menuTitle: {
    marginLeft: 16,
    fontSize: 14,
    color: colors.veryDark,
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 64,
    borderWidth: 1,
    borderColor: colors.white,
  },
  avatarContainer: {
    marginTop: -5,
    backgroundColor: colors.primary,
    // display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
    // alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});

export default styles;
