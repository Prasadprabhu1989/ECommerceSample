import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { CartContext } from './CartProvider';

export default function CartScreen() {
  const { cart, removeFromCart, increment, decrement, clearCart } =
    useContext(CartContext);

  const [selectedIds, setSelectedIds] = useState([]);

  // Automatically select all cart items whenever the cart changes
  useEffect(() => {
    setSelectedIds(cart.map(item => item.id));
  }, [cart]);

  const toggleSelect = id => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    if (selectedIds.length === cart.length) setSelectedIds([]);
    else setSelectedIds(cart.map(item => item.id));
  };

  const selectedItems = cart.filter(item => selectedIds.includes(item.id));
  const totalItems = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const amount = selectedItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );
  const shippingFee = totalItems > 0 ? 60 : 0;
  const total = amount + shippingFee;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <TouchableOpacity
              onPress={() => toggleSelect(item.id)}
              style={styles.checkbox}
            >
              <Text>{selectedIds.includes(item.id) ? '✅' : '⬜'}</Text>
            </TouchableOpacity>

            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.itemDesc}>
                Size: {item.size || '40'} | Color: {item.color || 'N/A'}
              </Text>

              <View style={styles.itemFooter}>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    onPress={() => decrement(item.id)}
                    style={styles.qtyBtn}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => increment(item.id)}
                    style={styles.qtyBtn}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryBox}>
          <Text>Items: {totalItems}</Text>
          <Text>Amount: ${amount}</Text>
          <Text>Shipping fee: ${shippingFee}</Text>
          <Text style={styles.total}>Total: ${total}</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={selectAll} style={styles.checkbox}>
          <Text>{selectedIds.length === cart.length ? '✅' : '⬜'}</Text>
        </TouchableOpacity>
        <Text style={{ marginRight: 10 }}>All</Text>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            selectedIds.forEach(id => removeFromCart(id));
            setSelectedIds([]);
          }}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  cancel: { color: '#007bff' },
  cartItem: { flexDirection: 'row', marginVertical: 10, alignItems: 'center' },
  checkbox: { marginRight: 10 },
  itemImage: { width: 70, height: 70, borderRadius: 10, marginRight: 10 },
  itemInfo: { flex: 1 },
  itemTitle: { fontWeight: 'bold', fontSize: 16 },
  itemDesc: { fontSize: 12, color: '#555' },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: { fontSize: 16, fontWeight: '600' },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  qtyText: { marginHorizontal: 10 },
  summaryContainer: { marginTop: 20 },
  summaryTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  summaryBox: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    gap: 5,
  },
  total: { marginTop: 5, fontWeight: 'bold', fontSize: 16 },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  deleteBtn: {
    flex: 1,
    marginRight: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007bff',
    alignItems: 'center',
  },
  deleteText: { color: '#007bff', fontWeight: 'bold' },
  checkoutBtn: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontWeight: 'bold' },
});
