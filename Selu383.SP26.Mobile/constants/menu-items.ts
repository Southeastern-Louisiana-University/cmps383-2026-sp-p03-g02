//worst case if we can't get the database accessibility working, we can have the menu items stored locally here so we can atleast demonstrate functionality

export interface MenuItem {
//id: number;
  name: string;
  image: any;
  description: string;
  price: number;
  type: string;
}

export const menuItems: MenuItem[] = [
  { name: 'Coffee', image: require('@/assets/images/coffer.png'), description: 'Just a regular coffee', price: 2.70, type: 'Coffee'},
  { name: 'Evil Coffee', image: require('@/assets/images/Dark fucked up coffee.jpg'), description: 'coffee but no coffee', price: 280.00, type: 'Coffee' },
  { name: 'Cattuccino', image: require('@/assets/images/cattuccino.png'), description: 'cat but coffee', price: 5.75, type: 'food' },
];